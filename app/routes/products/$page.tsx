import { Link, useLoaderData, useMatches } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import { json } from "@remix-run/server-runtime";
import { Image } from "~/components/Image";
import type { ProductsRouteLoaderType } from "../products";
import { Paging } from "~/components/Paging";
import { DEFAULT_PRODCUT_PAGE_SIZE, getProducts } from "~/api/products";

export async function loader({ params }: LoaderArgs) {
	const page = parseInt(params.page ?? "1");
	const pageSize = DEFAULT_PRODCUT_PAGE_SIZE;

	const productsPage = await getProducts(page, pageSize);
	return json({ productsPage, page, pageSize });
}

export default function ProductPage() {
	const { productsPage, page, pageSize } = useLoaderData<typeof loader>();

	const matches = useMatches();
	const productRoute = matches.find((x) => x.id === "routes/products");
	if (!productRoute) throw new Error("Route doesn't match to load paged products");

	const { headers, totalCount } = productRoute.data as ProductsRouteLoaderType;

	return (
		<>
			<table className="prose w-full max-w-full border-collapse border-none bg-white text-sm">
				<thead>
					{headers.map((header, index) => (
						<th
							key={`header_${index}`}
							className="border-b border-neutral-300 p-2 pt-0 pb-3 text-left text-sm font-medium text-teal-700"
						>
							{header}
						</th>
					))}
				</thead>
				<tbody>
					{productsPage.objs.map((row) => {
						return (
							<tr key={row.meta.id} className="duration-200 ease-in hover:bg-slate-100">
								<td className="border-b border-neutral-300 p-2 align-top text-sm text-black">
									<Link
										to={`/product/${row.meta.id}`}
										className="inline-block w-20 grow-0 rounded-sm border border-neutral-200 bg-neutral-100 p-2 text-center md:w-40 lg:w-60"
									>
										{row.props?.productImageRef && Array.isArray(row.props?.productImageRef) && (
											<Image
												className="m-0 inline"
												src={`/image/${row.props?.productImageRef[0]}`}
												alt={"image"}
											/>
										)}
									</Link>
								</td>
								<td>
									<Link
										to={`/product/${row.meta.id}`}
										className="text-sm font-semibold text-black no-underline hover:underline"
									>
										{row.props?.manufacturerProductDesignation as string}
									</Link>
								</td>
								<td>{row.props?.widthOfSensor as string}</td>
								<td>{row.props?.heightOfSensor as string}</td>
								<td>{row.props?.minOperatingAmbientTemperature as string}</td>
								<td>{row.props?.maxOperatingAmbientTemperature as string}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<Paging currentPage={page} itemsCount={totalCount} pageSize={pageSize} />
		</>
	);
}
