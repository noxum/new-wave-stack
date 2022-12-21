import type { HeadersFunction, LoaderArgs } from "@remix-run/node";
import type { ITableData } from "~/components/MetaDataTable";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { H1 } from "~/components/Typography";
import { defaultCacheHeaders } from "~/entry.server";
import { Image } from "~/components/Image";
import { Accordion, INamedAccordionItem } from "~/components/Accordion";
import { MetaDataTable } from "~/components/MetaDataTable";
import type { PropertyValueType } from "~/api/api.types";
import { RelatedProducts } from "~/components/RelatedProducts";
import { Grid } from "~/components/Grid";
import { getRandomImageSrc } from "mocks/images";
import { getProductDetails, getProductFormDetails, getProductRecommendations } from "~/api/products";

export interface IProductDetail extends INamedAccordionItem {
	data: ITableData[];
}

// Default Headers
export let headers: HeadersFunction = () => {
	return defaultCacheHeaders();
};

/**
 * Creates a ITableData array for all attributes this product has values for
 * @param attributeLabels
 * @param productProps
 * @returns
 */
function mapProductDetails(
	attributeLabels: ({ apiIdentifier: string | undefined; displayName: string } | null)[],
	productProps?: { [key: string]: PropertyValueType }
) {
	const details: ITableData[] = [];
	if (productProps === undefined) {
		console.error(`Product does not have any properties`);
		return details;
	}
	for (const attr of attributeLabels) {
		if (attr === null || attr.apiIdentifier === undefined) continue;
		const value = productProps[attr.apiIdentifier];
		// we skip properties without a value
		if (value === undefined) continue;
		const caption = attr.displayName;
		if (caption === undefined) continue;

		details.push({
			caption,
			value: value.toString(),
		});
	}
	return details;
}

export async function loader({ params }: LoaderArgs) {
	if (params.productId === undefined) {
		throw new Response(`Product was not found`, { status: 404 });
	}
	const productId = parseInt(params.productId);

	const productWithRefs = await getProductDetails(productId);
	const productDataForm = await getProductFormDetails();
	const relatedProducts = await getProductRecommendations();

	if (productWithRefs === null) {
		throw new Response(`Product with id '${params.productId}' was not Found`, { status: 404 });
	}

	const details: IProductDetail = {
		id: 1,
		title: "Product details",
		data: mapProductDetails(productDataForm, productWithRefs.obj.props),
	};

	const productMetaData: IProductDetail[] = [details];

	return json({ product: productWithRefs.obj, productMetaData, relatedProducts }, { headers: defaultCacheHeaders() });
}

export default function ProductDetails() {
	const { product, productMetaData, relatedProducts } = useLoaderData<typeof loader>();
	const mockedImage = getRandomImageSrc();
	return (
		<Grid container>
			<div className="prose mb-10 flex max-w-full flex-col gap-4 p-1 md:flex-row">
				<div className="grow">
					<H1 className="mb-5 font-normal">{product.displayName}</H1>
					<p>{(product.props.manufacturerProductDescription as string) ?? ""}</p>
				</div>
				<div className="item-center flex grow-0 basis-full rounded-sm border border-neutral-200 bg-neutral-100 p-1 text-center md:basis-96 lg:basis-1/3">
					<Image className="mx-auto inline self-center" src={mockedImage} alt={"image"} />
				</div>
			</div>

			<Accordion
				items={productMetaData}
				onRenderItem={(meta) => {
					const item = meta as IProductDetail;
					return <MetaDataTable data={item.data} />;
				}}
			/>
			<RelatedProducts products={relatedProducts.objs} />
		</Grid>
	);
}
