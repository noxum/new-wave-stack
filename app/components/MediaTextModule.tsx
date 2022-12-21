import { twMerge } from "tailwind-merge";
import type { INovaDBHtmlContent, MediaModuleDataProps, MediaModuleReferences } from "~/api/api.types";
import { Image } from "~/components/Image";
import { Grid } from "./Grid";
import { IModule } from "./Module";
import { H2 } from "./Typography";

export interface IMediaTextModuleProps extends MediaModuleDataProps, MediaModuleReferences, IModule {
	nested?: boolean;
}

export default function MediaTextModule({
	title,
	reverse,
	htmlContent,
	moduleSize,
	image,
	className,
	nested,
}: IMediaTextModuleProps) {
	const moduleSizeProp = moduleSize ? { [moduleSize as string]: true } : {};
	const imageUrl = image
		? `/image/${image.props.externalBinaryMD5}${image.props.externalBinaryFileExtension}`
		: undefined;

	const twCls = twMerge(
		"mediatext flex flex-auto gap-4 self-start",
		moduleSizeProp.small ? "flex-col" : "md:flex-row flex-col",
		!!reverse && "md:flex-row-reverse flex-col-reverse",
		!!reverse && moduleSizeProp.small && "md:flex-col md:flex-col-reverse ",
		className
	);
	const twClsImage = twMerge("lg:w-1/3 w-full", moduleSizeProp.small && "lg:w-full", className);
	const twClsContent = twMerge("prose max-w-[100vw] w-full lg:w-2/3", moduleSizeProp.small && "lg:w-full", className);
	return (
		<Grid as="div" {...moduleSizeProp} nested={nested} className={twCls}>
			{imageUrl && (
				<div className={twClsImage}>
					<Image src={imageUrl} alt={"not defined"} width="100%" height="auto" />
				</div>
			)}
			<div className={twClsContent}>
				{title && <H2>{title as string}</H2>}
				{htmlContent && <div dangerouslySetInnerHTML={{ __html: (htmlContent as INovaDBHtmlContent).XML }} />}
			</div>
		</Grid>
	);
}
