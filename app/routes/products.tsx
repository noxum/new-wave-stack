import type { HeadersFunction, LoaderArgs, MetaFunction, TypedResponse } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { H1 } from "~/components/Typography";
import {
	defaultCacheHeaders,
	resolveByUrl,
} from "~/entry.server";
import { Grid } from "~/components/Grid";
import { DEFAULT_PRODCUT_PAGE_SIZE, getProductsCount } from "~/api/products";

export type ProductsRouteLoaderType<T = ReturnType<typeof loader>> = T extends Promise<TypedResponse<infer U>>
	? U
	: never;

// Default Headers
export let headers: HeadersFunction = () => {
	return defaultCacheHeaders();
};

export async function loader({ params }: LoaderArgs) {
	if (params.page === undefined || params.page === "0") return redirect(`/products/1`, { status: 301 });

	const productsCount = await getProductsCount();
	const page = parseInt(params.page);
	const lastPage = Math.ceil(productsCount.count / DEFAULT_PRODCUT_PAGE_SIZE);
	if (page > lastPage) return redirect(`/products/${lastPage}`);

	const webPage = await resolveByUrl("Products");

	// TODO: Load this from NovaDb too
	const headers = [
		"Logo",
		"Manufacturer product designation",
		"Width of sensor",
		"Height of sensor",
		"min. operating ambient temperature",
		"max. operating ambient temperature"
	];

	return json({ webPage, headers, totalCount: productsCount.count, page }, { headers: defaultCacheHeaders() });
}

export const meta: MetaFunction = ({ data }: { data: any }) => {
	let metaData = data.webPage?.props?.seo_noindex ? "noindex" : "index";
	metaData += "," + (data.webPage?.props?.seo_nofollow ? "nofollow" : "follow");
	return {
		robots: metaData,
	};
};

export default function Products() {
	return (
		<Grid container>
			<H1 className="mb-5">Products</H1>
			<div className="w-full overflow-hidden overflow-x-auto">
				<Outlet />
			</div>
		</Grid>
	);
}
