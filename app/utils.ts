import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
	to: FormDataEntryValue | string | null | undefined,
	defaultRedirect: string = DEFAULT_REDIRECT
) {
	if (!to || typeof to !== "string") {
		return defaultRedirect;
	}

	if (!to.startsWith("/") || to.startsWith("//")) {
		return defaultRedirect;
	}

	return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(id: string): Record<string, unknown> | undefined {
	const matchingRoutes = useMatches();
	const route = useMemo(() => matchingRoutes.find((route) => route.id === id), [matchingRoutes, id]);
	return route?.data;
}

export function validateEmail(email: unknown): email is string {
	return typeof email === "string" && email.length > 3 && email.includes("@");
}

/**
 * Get extension from a file name
 * @param name - file name
 */
export function getExtension(name: string) {
	const match = name.match(".[a-zA-Z]+$");
	let extension = "";
	if (match) {
		extension = match.length > 0 ? match[0] : "";
		extension = extension.toLowerCase().slice(1);
	}
	return extension;
}

export function getMIMEType(extension: string): string {
	switch (extension) {
		case "jpg":
			return "image/jpeg";
		case "svg":
			return "image/svg+xml";
		case "jpeg":
		case "png":
		case "gif":
		case "webp":
			return `image/${extension}`;
		default:
			throw Error("Extension is not mapped to a MIME Type");
	}
}

export function expandQueryParams(url: string, ...args: string[]) {
	var urlObj = new URL(url);
	args.forEach((element) => {
		var keyValue = element.split("=", 2);
		if (urlObj.searchParams.has(keyValue[0])) {
			urlObj.searchParams.set(keyValue[0], keyValue[1]);
		} else {
			urlObj.searchParams.append(keyValue[0], keyValue[1]);
		}
	});
	return urlObj.toString();
}

export const getRandomNumber = (range: number) => Math.floor(Math.random() * range);
