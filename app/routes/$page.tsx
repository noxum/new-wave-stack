import { json } from "@remix-run/node";
import type { HeadersFunction } from "@remix-run/node";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import { defaultCacheHeaders, resolveByUrl } from "~/entry.server";
import { NotFound } from "~/components/NotFound";
import { ModuleGroup } from "~/components/ModuleGroup";

// Default Headers
export let headers: HeadersFunction = () => {
	return defaultCacheHeaders();
};

export const loader = async ({ params }: LoaderArgs) => {
	const page = await resolveByUrl(params.page);

	if (!page) {
		throw new Response(`Page '${params.page}' was not Found`, { status: 404 });
	}
	
	return json(
		{ page, modules: page.references.modules },
		{ headers: defaultCacheHeaders() }
	);
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data || !data.page) return {};

	const { props } = data.page;
	if (!props) return {};
	let metaData = props.seo_noidex ? "noindex" : "index";
	metaData += "," + props.seo_nofollow ? "nofollow" : "follow";
	return {
		title: props.navigationTitle as string,
		robots: metaData,
	};
};

export default function Page() {
	const { modules } = useLoaderData<typeof loader>();

	return <ModuleGroup modules={modules} />;
}

export function CatchBoundary() {
	const caught = useCatch();
	console.error(`Hit CatchBoundary: ${caught.data}`);
	return <NotFound {...caught} />;
}
