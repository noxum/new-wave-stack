import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import { Response } from "@remix-run/node";
import type { EntryContext, Headers } from "@remix-run/node";
import isbot from "isbot";
import { getBinaryAsStream, getObject, listObjects } from "./api/novaDb";
import type {
	IAccordionModule,
	IChartItem,
	IChartModule,
	IImageGalleryModule,
	IMediaTextModule,
	INovaDbImage,
	IParallaxModule,
	IProduct,
	ITeaserItem,
	ITeaserModule,
	ITextModule,
	IWebPage,
	NovaDbObject,
} from "./api/api.types";
import { INamedAccordionItem } from "./components/Accordion";

const ABORT_DELAY = 5000;


/**
 * Resolves a web page by the given url segment
 * @param urlSegment The urlSegment is mapped to the attribute DisplayName
 * @returns IWebpage object
 */
export async function resolveByUrl(urlSegment: string | undefined) {
	if (!urlSegment) urlSegment = "index";
	let webPage: IWebPage | undefined;
	const range = await listObjects<IWebPage>(
		"webPage",
		"moduleRefs, teaserItemRefs, mediaTextModuleRef, imageRef, accordionItemRefs, chartItemRefs, imageGalleryRefs",
		`displayName:"${urlSegment.toLocaleLowerCase()}"`
	);
	if (range.count !== 1) return null;

	webPage = range.objs[0];
	let references = toReferenceMap(range.refs);
	if (webPage.props.moduleRefs) {
		webPage.references = { modules: getObjectReferences(webPage.props.moduleRefs as number[], references) };
		for (const moduleRef of webPage.references.modules) {
			await resolveObjectReferences(moduleRef, references);
		}
	}
	return webPage ?? null;
}

/** Resolves all references of the given NovaDB object based on its object type
 * @param object The NovaDb object served by the Delivery API 
 * @param references A Map of the resolved references for this object
 * 
 */
export async function resolveObjectReferences(object: NovaDbObject, references: Map<number, NovaDbObject>) {

	switch (object.meta.type) {
		case "mediaTextModule":
			{
				const module = object as IMediaTextModule;
				if (module.props.imageRef)
					module.references = { image: getSingleObjectReference(module.props.imageRef as number, references) as INovaDbImage };
				break;
			}
		case "parallaxImageModule":
			{
				const module = object as IParallaxModule;
				if (module.props.imageRef)
					module.references = { image: getSingleObjectReference(module.props.imageRef as number, references) as INovaDbImage };
				break;
			}
		case "imageGalleryModule":
			{
				const module = object as IImageGalleryModule;
				const imageRefs = module.props.imageGalleryRefs as number[];
				if (imageRefs) {
					module.references = { images: getObjectReferences(imageRefs, references) as INovaDbImage[] }
				}
				break;
			}
		case "teaserModule":
			{
				const module = object as ITeaserModule;
				const teaserRefs = module.props.teaserItemRefs as number[];
				if (teaserRefs) {
					const teaserItems = getObjectReferences(teaserRefs, references) as ITeaserItem[]
					for (const teaserItem of teaserItems) {
						await resolveObjectReferences(teaserItem, references);
					}
					module.references = { teaserItems }
				}
				break;

			}
		case "teaserItem":
			{
				const module = object as ITeaserItem;
				const mediaTextModuleRef = module.props.mediaTextModuleRef as number;
				const targetRef = module.props.targetRef as number;
				let mediaText: IMediaTextModule | undefined;
				let targetLink: string | undefined;
				if (mediaTextModuleRef) {
					mediaText = getSingleObjectReference(mediaTextModuleRef, references) as IMediaTextModule;
					resolveObjectReferences(mediaText, references);
				}
				if (targetRef) {
					const target = await getObject<IWebPage>(targetRef);
					if (target.obj) {
						targetLink = resolveUrlFromWebPage(target.obj);
					}
				}
				if (mediaText && targetLink) {
					module.references = { mediaText, targetLink };
				}
				break;
			}
		case "accordionModule":
			{
				const module = object as IAccordionModule;
				const accordionRefs = module.props.accordionItemRefs as number[];
				if (accordionRefs) {
					const accordionItems = getObjectReferences(accordionRefs, references);
					accordionItems.map(async (accordionItem) => await resolveObjectReferences(accordionItem, references));
					const items = accordionItems.map<INamedAccordionItem>((item) => {
						if (item.meta.type === "textModule") {
							const textModule = item as ITextModule;
							return { id: textModule.meta.id, title: textModule.props.title as string, textModule }
						}
						if (item.meta.type === "mediaTextModule") {
							const mediaModule = item as IMediaTextModule;
							return { id: mediaModule.meta.id, title: mediaModule.props.title as string, mediaModule };
						}
						throw new Error(`Type ${item.meta.type} is not supported in the accordionModule`);
					});
					module.references = { accordionItems: items };
				}
				break;
			}

		case "chartModule":
			{
				const module = object as IChartModule;
				const chartRefs = module.props.chartItemRefs as number[];
				if (chartRefs) {
					module.references = { chartItems: getObjectReferences(chartRefs, references) as IChartItem[] };
				}
				break;
			}
		case "product":
			{
				const product = object as IProduct;
				const productImgRef = product.props.productImageRef as number;
				if (productImgRef) {
					product.references = { image: getSingleObjectReference(productImgRef, references) as INovaDbImage };
				}
				break;
			}

	}

}

function getSingleObjectReference(id: number, references: Map<number, NovaDbObject>): NovaDbObject | null {
	const refs = getObjectReferences([id], references);
	if (!refs || refs.length !== 1) return null;
	return refs[0];
}


function getObjectReferences(refIds: number[], references: Map<number, NovaDbObject>): NovaDbObject[] {
	if (references.size === 0) return [];
	const resolvedReferences: NovaDbObject[] = [];
	for (const refID of refIds) {
		const reference = references.get(refID);
		if (!reference) continue;
		resolvedReferences.push(reference);
	}
	return resolvedReferences;
}


/**
 * Gets the image from NovaDB for the given src (guid.extension)
 * @param src
 * @returns Readable stream of the image
 */
export async function getImageAsStream(src: string) {
	return await getBinaryAsStream(src);
}


/**
 * Computes the url from a given 'Webpage' object by turning the 'displayName' into an encoded URI fragment
 * @param page The Webpage object
 * @returns The uri fragment for the given Webpage object
 */
function resolveUrlFromWebPage(page: IWebPage) {
	if (!page) {
		console.warn("Target ref was not found");
		return "/";
	}
	if (!page.displayName) {
		console.warn(`Webpage ${page.meta.id} does not provide a displayName`);
		return "/";
	}
	return `${encodeURIComponent(page.displayName.toLocaleLowerCase())}`;
}


/**
 * Creates a Map object out of INovaDbObj items
 * @param refs
 * @returns Map<number, INovaDbObj>
 */
export function toReferenceMap(refs: NovaDbObject[]) {
	const referenceMap: Map<number, NovaDbObject> = new Map();
	for (const ref of refs) {
		referenceMap.set(ref.meta.id, ref);
	}
	return referenceMap;
}

/** Provides a default cache header public, max-age:5 */
export function defaultCacheHeaders(): HeadersInit {
	return { "Cache-Control": "public, max-age=5" };
}

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext
) {
	const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";

	return new Promise((resolve, reject) => {
		let didError = false;

		const { pipe, abort } = renderToPipeableStream(<RemixServer context={remixContext} url={request.url} />, {
			[callbackName]() {
				let body = new PassThrough();

				responseHeaders.set("Content-Type", "text/html");

				resolve(
					new Response(body, {
						status: didError ? 500 : responseStatusCode,
						headers: responseHeaders,
					})
				);
				pipe(body);
			},
			onShellError(err: unknown) {
				reject(err);
			},
			onError(error: unknown) {
				didError = true;
				console.error(error);
			},
		});
		setTimeout(abort, ABORT_DELAY);
	});
}
