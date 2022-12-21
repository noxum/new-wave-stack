import { Link } from "@remix-run/react";
import { getRandomImageSrc } from "mocks/images";
import type { IProduct } from "~/api/api.types";
import { Grid } from "./Grid";
import { Image } from "./Image";
import { H2 } from "./Typography";

export interface IRelatedProductsProps {
	products: IProduct[];
}

function RelatedProducts({ products }: IRelatedProductsProps) {
	if (!products || products.length === 0) return null;
	return (
		<Grid as="section" contentRow className="gap-4">
			<H2 className="col-span-12 mb-5">Similar products</H2>
			{products.map((product) => {
				const images = product.props?.productImageRef as number[];
				const mockedImage = getRandomImageSrc();
				return (
					<Grid
						small
						nested
						key={product.meta.id}
						className="group rounded-sm border bg-gray-50 hover:border-gray-400"
					>
						<Link
							key={product.meta.id}
							prefetch="intent"
							to={`/product/${product.meta.id}`}
							className="flex w-full flex-col"
						>
							{images && (
								<Image
									className="mx-auto inline self-center p-2 duration-500 ease-in-out group-hover:scale-95"
									src={mockedImage}
									alt={"image"}
								/>
							)}
							<div className="block bg-white py-2 px-5 text-xl font-semibold text-teal-700">
								{product.displayName}
							</div>
						</Link>
					</Grid>
				);
			})}
		</Grid>
	);
}

export { RelatedProducts };
