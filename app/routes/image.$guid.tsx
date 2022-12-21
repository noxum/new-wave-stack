import type { LoaderFunction } from "@remix-run/node";
import type { Params } from "react-router";
import type { Readable } from "stream";
import { PassThrough } from "stream";
import sharp from "sharp";
import { getImageAsStream } from "~/entry.server";

interface ResizeParams {
	src: string;
	width: number | undefined;
	height: number | undefined;
}

const extractParams = (params: Params<string>, request: Request): ResizeParams => {
	const src = `${params.guid}`;
	const searchParams = new URL(request.url).searchParams;

	const width = searchParams.has("w") ? Number.parseInt(searchParams.get("w") ?? "0") : undefined;
	const height = searchParams.has("h") ? Number.parseInt(searchParams.get("h") ?? "0") : undefined;

	return { src, width, height };
};

const streamingResize = (
	imageStream: Readable,
	width: number | undefined,
	height: number | undefined,
	contentType: string
) => {
	const passthroughStream = new PassThrough();

	// Resize image only if the image is jpeg or png. All others are directly returned
	if (contentType === "image/jpeg" || contentType === "image/webp" || contentType === "image/png") {
		let sharpTransforms = sharp().resize({
			width,
			height,
			position: sharp.strategy.attention, // will try to crop the image and keep the most interesting parts
		});

		switch (contentType) {
			case "image/webp":
				sharpTransforms = sharpTransforms.webp({
					quality: 80,
				});
				break;
			case "image/jpeg":
				sharpTransforms = sharpTransforms.jpeg({
					mozjpeg: true, // use mozjpeg defaults, = smaller images
					quality: 80,
				});
				break;
			case "image/png":
				sharpTransforms = sharpTransforms.png({
					quality: 80,
				});
				break;
		}
		imageStream.pipe(sharpTransforms).pipe(passthroughStream);
	} else {
		imageStream.pipe(passthroughStream);
	}

	return new Response(passthroughStream as any, {
		headers: {
			"Content-Type": contentType,
			"Cache-Control": "public, max-age=31536000, immutable",
		},
	});
};

const handleError = (error: unknown) => {
	// error needs to be typed
	const errorT = error as Error & { code: string };
	// if the read stream fails, it will have the error.code ENOENT
	if (errorT.code === "ENOENT") {
		return new Response("image not found", {
			status: 404,
			headers: {
				"Content-Type": "text/plain",
				"Cache-Control": "no-cache, no-store, must-revalidate",
			},
		});
	}

	// if there is an error processing the image, we return a 500 error
	return new Response(errorT.message, {
		status: 500,
		statusText: errorT.message,
		headers: {
			"Content-Type": "text/plain",
			"Cache-Control": "no-cache, no-store, must-revalidate",
		},
	});
};

export const loader: LoaderFunction = async ({ params, request }) => {
	// extract all the parameters from the url
	const { src, width, height } = extractParams(params, request);

	try {
		// read the image as a stream of bytes - the source for webp images should be jpg
		const readStreamResult = await getImageAsStream(src.replace(".webp", ".jpg"));
		// read the image from the file system and stream it through the sharp pipeline
		return streamingResize(readStreamResult.stream, width, height, readStreamResult.contentType);
	} catch (error: unknown) {
		// if the image is not found, or we get any other errors we return different response types
		return handleError(error);
	}
};
