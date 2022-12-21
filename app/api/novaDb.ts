import type {
	INovaDbObjectType,
	INovaDbRange,
	INovaDbResult,
	IObjectCountResult,
	NovaDbObject,
	ObjectType,
} from "./api.types";
import { Transform } from "stream";
import http from "http";
import https from "https";
import { expandQueryParams } from "~/utils";

const TOKEN = process.env.BASIC_AUTH_TOKEN;
const NOVADB_ENDPOINT = process.env.DELIVERY_API;
const NOVADB_BRANCH = process.env.BRANCH;

const BASIC = `Basic ${TOKEN}`;

/** Creates an Delivery API Request object including auth and content type headers */ 
const deliveryApiRequest = (url: string) => {
	const headers = new Headers();
	headers.set("Authorization", BASIC);
	headers.set("Content-Type", "application/json; charset=utf-8");
	return new Request(url, {
		method: "GET",
		headers,
	});
};

/**
 *  Get a single scoped object
 * @param id The object's id
 * @param resolve  A comma separated list of ApiIdentifiers attributes to be resolved and returned in a "refs" list. Wrong ApiIdentifiers are ignored
 * @param filter A list of filter conditions joined with the AND operator '&&'. A condition is build from an ApiIdentifier, a compare operator (=, !=, <, >, <=, >=, :) and a value. Prefix with 'meta.' to access meta data.
 */
async function getObject<T extends NovaDbObject>(id: number | string, resolve?: string, filter?: string) {
	const searchParams: string[] = [];
	if (resolve) searchParams.push(`resolve=${resolve}`);
	if (filter) searchParams.push(`filter=${filter}`);

	var expandedUrl = expandQueryParams(`${NOVADB_ENDPOINT}branches/${NOVADB_BRANCH}/objects/${id}`, ...searchParams);
	const request = deliveryApiRequest(expandedUrl);
	const response = await fetch(request);
	return response.json() as Promise<INovaDbResult<T>>;
}

/**
 * Get a single typed and scoped object
 * @param id The object's id
 * @param type The object type as an ID or ApiIdentifier
 * @param resolve  A comma separated list of ApiIdentifiers attributes to be resolved and returned in a "refs" list. Wrong ApiIdentifiers are ignored
 * @param filter A list of filter conditions joined with the AND operator '&&'. A condition is build from an ApiIdentifier, a compare operator (=, !=, <, >, <=, >=, :) and a value. Prefix with 'meta.' to access meta data.
 */
async function getObjectByType<T extends NovaDbObject>(
	id: number | string,
	type: ObjectType,
	resolve?: string,
	filter?: string
) {
	const searchParams: string[] = [];
	if (resolve) searchParams.push(`resolve=${resolve}`);
	if (filter) searchParams.push(`filter=${filter}`);
	searchParams.push("deleted=false");

	const expandedUrl = expandQueryParams(
		`${NOVADB_ENDPOINT}branches/${NOVADB_BRANCH}/types/${type}/objects/${id}`,
		...searchParams
	);
	const request = deliveryApiRequest(expandedUrl);
	const response = await fetch(request);
	return response.json() as Promise<INovaDbResult<T>>;
}

/**
 * Get a list of typed and scoped objects
 * @param type The object type as an ID or ApiIdentifier
 * @param resolve  A comma separated list of ApiIdentifiers attributes to be resolved and returned in a "refs" list. Wrong ApiIdentifiers are ignored
 * @param filter A list of filter conditions joined with the AND operator '&&'. A condition is build from an ApiIdentifier, a compare operator (=, !=, <, >, <=, >=, :) and a value. Prefix with 'meta.' to access meta data.
 * @param sort  A comma separated list of attribute IDs or ApiIdentifiers used as sort criteria. 'asc' or 'desc' can be used as an additional keyword to set the sort order. The default sort order is by object ID
 * @param skip Skip a number of items. Must not be negative.
 * @param take Take this number of items. Must be in the range 1..1000
 */
async function listObjects<T extends INovaDbObjectType>(
	type: ObjectType,
	resolve?: string,
	filter?: string,
	sort?: string,
	skip: number = 0,
	take: number = 100
) {
	const searchParams: string[] = [];
	if (resolve) searchParams.push(`resolve=${resolve}`);
	if (filter) searchParams.push(`filter=${filter}`);
	if (sort) searchParams.push(`sort=${sort}`);
	searchParams.push(`skip=${skip}`);
	searchParams.push(`take=${take}`);
	searchParams.push("deleted=false");

	const expandedUrl = expandQueryParams(
		`${NOVADB_ENDPOINT}branches/${NOVADB_BRANCH}/types/${type}/objects`,
		...searchParams
	);
	const request = deliveryApiRequest(expandedUrl);
	const response = await fetch(request);
	return response.json() as Promise<INovaDbRange<T>>;
}

async function getBinaryAsStream(src: string) {
	try {
		let srcUrl;

		if (src.indexOf(".") === -1) srcUrl = new URL(`${NOVADB_ENDPOINT}branches/${NOVADB_BRANCH}/files/${src}`);
		else srcUrl = new URL(`${NOVADB_ENDPOINT}files/${src}`);

		const transformStream = new Transform();
		let returnContentType = "";
		transformStream._transform = function(chunk, _encoding, done) {
			this.push(chunk);
			done();
		};
		const options = {
			hostname: srcUrl.hostname,
			path: srcUrl.pathname,
			headers: {
				Authorization: BASIC,
			},
		};
		if (process.env.NODE_ENV === "development") {
			https.get(options, (res) => {
				returnContentType = res.headers["content-type"] ?? "";
				res.pipe(transformStream);
			});
		} else {
			http.get(options, (res) => {
				returnContentType = res.headers["content-type"] ?? "";
				res.pipe(transformStream);
			});
		}
		return { stream: transformStream, contentType: returnContentType };
	} catch (error: unknown) {
		console.error(`Error while getting binary from delivery api : ${src}`, error);
		return { stream: new Transform(), contentType: "" };
	}
}

/**
 * Count typed objects
 * @param type The ObjectType
 * @param filter A list of filter conditions joined with the AND operator '&&'. A condition is build from an ApiIdentifier, a compare operator (=, !=, <, >, <=, >=, :) and a value. Prefix with 'meta.' to access meta data.
 */
async function getObjectCount(type: ObjectType, filter?: string) {
	const searchParams: string[] = [];
	if (filter) searchParams.push(`filter=${filter}`);
	searchParams.push("deleted=false");

	const expandedUrl = expandQueryParams(
		`${NOVADB_ENDPOINT}branches/${NOVADB_BRANCH}/types/${type}/count`,
		...searchParams
	);
	const request = deliveryApiRequest(expandedUrl);
	const response = await fetch(request);
	return response.json() as Promise<IObjectCountResult>;
}

export { getObject, getObjectCount, getObjectByType, listObjects, getBinaryAsStream };
