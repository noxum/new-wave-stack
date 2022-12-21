import { twMerge } from "tailwind-merge";
import type { INovaDBHtmlContent, TextModuleDataProps } from "~/api/api.types";
import { Grid } from "./Grid";
import { IModule } from "./Module";
import type { IContainerProps } from "./types";
import { H2 } from "./Typography";

export interface ITextModuleProps extends TextModuleDataProps, IContainerProps, IModule {
	children?: React.ReactNode;
}

export const TextModule = ({
	title,
	moduleSize,
	htmlContent,
	children,
	className,
	...containerProps
}: ITextModuleProps) => {
	const twCls = twMerge("text prose max-w-none break-words", containerProps.nested ? "" : "", className);
	const moduleSizeProp = moduleSize ? { [moduleSize as string]: true } : {};
	const html = htmlContent ? (htmlContent as INovaDBHtmlContent).XML : "";
	return (
		<Grid as="div" className={twCls} {...containerProps} {...moduleSizeProp}>
			{title && <H2>{title as string}</H2>}
			<div
				dangerouslySetInnerHTML={{
					__html: html,
				}}
			/>
			{children}
		</Grid>
	);
};
