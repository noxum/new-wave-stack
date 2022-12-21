import { DefaultBodyType, RequestQuery, ResponseResolver, rest, RestContext, RestRequest } from "msw";
// import furnitureImg from "./furniture.jpg";

/**
 * Buffers an image and pushes it into the response body for the intercepted image source request
 * @param base64Image The resolved static file resource (base64)
 */
const buildImageBufferResponse =
	(base64Image: string): ResponseResolver<RestRequest<DefaultBodyType, RequestQuery>, RestContext, any> =>
		async (_, res, ctx) => {
			const imageBuffer = await fetch(base64Image).then((res) => res.arrayBuffer());

			return res(
				ctx.set("Content-Length", imageBuffer.byteLength.toString()),
				ctx.set("Content-Type", "image/jpg"),
				// Respond with the "ArrayBuffer".
				ctx.body(imageBuffer)
			);
		};

const externalBinaryEndpoint = "https://webcatalog.workspace.novadb.com/deliveryapi/branches/:branch/files/:src";
/**
 * Provides handlers to mock image requests
 */
export const imageHandlerProvider = () => {
	const defaultImageHandler = [
		rest.get(externalBinaryEndpoint, buildImageBufferResponse("")),
	];

	return {
		/** Intercepts all "/icon/:imageId" requests and returns the basic object type icon*/
		defaultImageHandler,
	};
};
