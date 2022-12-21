import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, LoaderArgs, MetaFunction } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { ModuleGroup } from "~/components/ModuleGroup";
import { defaultCacheHeaders, resolveByUrl } from "~/entry.server";

// Default Headers
export let headers: HeadersFunction = () => {
	return defaultCacheHeaders();
};

export const loader = async ({ params }: LoaderArgs) => {
	const index = await resolveByUrl("Index");
	

	if (index === null) {
		console.error("You have to maintain a start page with the Name 'Index' within NovaDB");
		throw new Response(`Page '${params.page}' was not Found`, { status: 404 });
	}
	if (index.props === undefined || index.references.modules === undefined) {
		console.error("The start page 'Index' at least has to have one moduleRef object maintained");
		throw new Response(`Page '${params.page}' has no content`, { status: 404 });
	}
	return json({ page: index }, { headers: defaultCacheHeaders() });
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

export default function Index() {
	const { page } = useLoaderData<typeof loader>();
	return <ModuleGroup modules={page.references.modules} />;
}
