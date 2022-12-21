import React, { Suspense } from "react";
import type {
	AccordionModuleDataProps,
	AccordionReferences,
	ChartModuleReferences,
	ImageGalleryReferences,
	INovaDbObjectType,
	MediaModuleDataProps,
	MediaModuleReferences,
	ObjectType,
	ParallaxModuleDataProps,
	ParallaxModuleReferences,
	TeaserModuleDataProps,
	TeaserModuleReferences,
	TextModuleDataProps,
} from "~/api/api.types";
import type { IVideoModuleProps } from "./VideoModule";
import type { IChartModuleProps } from "./ChartModule";
import type { IImageGalleryProps } from "~/components/ImageGallery";
import { TextModule } from "./TextModule";
import MediaTextModule from "./MediaTextModule";
import ParallaxImageModule from "./ParallaxImageModule";
import { AccordionModule } from "./AccordionModule";
import { VideoModule } from "./VideoModule";
import TeaserModule from "./TeaserModule";

const ChartModule = React.lazy(() => import("~/components/ChartModule"));
const ImageGallery = React.lazy(() => import("~/components/ImageGallery"));

export interface IPageModule {
	type: ObjectType;
	module: INovaDbObjectType;
}

export interface IModule {
	className?: React.HtmlHTMLAttributes<HTMLElement>["className"];
}

export const Module = ({ type, module }: IPageModule) => {
	return (
		<>
			{type === "textModule" && <TextModule {...(module.props as TextModuleDataProps)} />}
			{type === "teaserModule" && (
				<TeaserModule
					{...(module.props as TeaserModuleDataProps)}
					{...(module.references as TeaserModuleReferences)}
				/>
			)}
			{type === "mediaTextModule" && (
				<MediaTextModule
					{...(module.props as MediaModuleDataProps)}
					{...(module.references as MediaModuleReferences)}
				/>
			)}
			{type === "parallaxImageModule" && (
				<ParallaxImageModule
					{...(module.props as ParallaxModuleDataProps)}
					{...(module.references as ParallaxModuleReferences)}
				/>
			)}
			{type === "accordionModule" && (
				<AccordionModule
					{...(module.props as AccordionModuleDataProps)}
					items={(module.references as AccordionReferences).accordionItems}
				/>
			)}
			{type === "videoModule" && <VideoModule {...(module.props as IVideoModuleProps)} />}
			{type === "imageGalleryModule" && (
				<Suspense fallback={<div>Loading Image Gallery</div>}>
					<ImageGallery
						{...(module.props as IImageGalleryProps)}
						{...(module.references as ImageGalleryReferences)}
					/>
				</Suspense>
			)}
			{type === "chartModule" && (
				<Suspense fallback={<div>Loading chart</div>}>
					<ChartModule
						{...(module.props as IChartModuleProps)}
						{...(module.references as ChartModuleReferences)}
					/>
				</Suspense>
			)}
		</>
	);
};
