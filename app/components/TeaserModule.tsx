import { Link } from "@remix-run/react";
import { twMerge } from "tailwind-merge";
import { Grid } from "./Grid";
import { ITeaserItem, TeaserModuleDataProps, TeaserModuleReferences } from "~/api/api.types";
import { Image } from "./Image";

export interface ITeaserModuleProps extends TeaserModuleDataProps, TeaserModuleReferences {}


export default function TeaserModule({ teaserItems }: ITeaserModuleProps) {
	const twCls = twMerge("grid grid-cols-1 md:grid-cols-3 gap-4");

	return (
		<Grid as="section" className={twCls} large>
			{teaserItems.map((teaserItem) => (
				<div key={teaserItem.meta.id} className="group rounded-sm border bg-gray-50 hover:border-gray-400">
					{teaserItem.references.targetLink !== undefined ? (
						<Link prefetch={"intent"} to={`/${teaserItem.references.targetLink as string}`}>
							<TeaserContent item={teaserItem} />
						</Link>
					) : (
						<TeaserContent item={teaserItem} />
					)}
				</div>
			))}
		</Grid>
	);
}

function TeaserContent({ item }: { item: ITeaserItem }) {
	const mediaModule = item.references.mediaText;
	const image = mediaModule.references.image;
	const imgSrc = `/image/${image.props.externalBinaryMD5}${image.props.externalBinaryFileExtension}`;
	return (
		<>
			<div className="block bg-white py-2 px-5 text-xl font-semibold text-teal-700">
				{mediaModule.props.title as string}
			</div>
			{mediaModule.references.image && (
				<Image
					src={imgSrc}
					className="p-2 duration-500 ease-in-out group-hover:scale-95"
					alt="not defined"
				/>
			)}
		</>
	);
}
