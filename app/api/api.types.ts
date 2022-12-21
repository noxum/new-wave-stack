import type { Readable } from "stream";
import { INamedAccordionItem } from "~/components/Accordion";

export type ObjectType =
	| "webPage"
	| "textModule"
	| "mediaTextModule"
	| "parallaxImageModule"
	| "accordionModule"
	| "imageGalleryModule"
	| "teaserModule"
	| "videoModule"
	| "chartModule"
	| "teaserItem"
	| "image"
	| "chartElement"
	| "product"
	| "typeForm";

export type ApiIdentifier =
	| "WebPage"
	| "seo_noidex"
	| "seo_nofollow"
	| "navigationTitle"
	| "attributeName"
	| "displayName"
	| "displayIcon"
	| "moduleRefs"
	| "title"
	| "moduleSize"
	| "htmlContent"
	| "reverse"
	| "mediaSize"
	| "imageRef"
	| "exifCopyright"
	| "externalBinaryFileExtension"
	| "externalBinaryMD5"
	| "manufacturerProductDescription"
	| "manufacturerProductDesignation"
	| "productImageRef"
	| "productArticleNumberOfManufacturer"
	| "gtin"
	| "manufacturerName"
	| "productType"
	| "materialOfHousing"
	| "housingConstructionForm"
	| "designOfControlElement"
	| "designOfControlOutput"
	| "minSupplyVoltage"
	| "maxSupplyVoltage"
	| "switchFrequency"
	| "lengthOfSensor"
	| "heightOfSensor"
	| "widthOfSensor"
	| "minOperatingAmbientTemperature"
	| "maxOperatingAmbientTemperature"
	| "accordionItemRefs"
	| "youtubeLink"
	| "formContent"
	| "chartType"
	| "chartValue"
	| "chartColor"
	| "chartItemRefs"
	| "imageGalleryRefs"
	| "teaserItemRefs"
	| "targetRef"
	| "mediaTextModuleRef";

export type PropertyValueType = string | number | boolean | string[] | number[] | INovaDBHtmlContent;

export type NovaDbPropType<T extends ApiIdentifier> = Record<T, PropertyValueType>;

export type NovaDbObject = INovaDbObjectType & INovaMeta<ObjectType>;

export interface INovaDBHtmlContent {
	XML: string;
	objRefs?: number[];
	parsedXML?: string;
}

export interface INovaDbSystem<T extends ObjectType> {
	id: number;
	guid: string;
	apiIdentifier?: string;
	type: T;
	typeRef: number;
	language: string;
	deleted: boolean;
	lastModified: string;
	lastTransaction: number;
	etag: string;
}

export interface INovaMeta<T extends ObjectType> {
	meta: INovaDbSystem<T>;
}

export interface INovaDbObjectType {
	displayName: string;
	displayIcon: number;
	props?: unknown;
	references?: unknown;
}

export interface IResolvable {
	refs: NovaDbObject[];
}

export interface INovaDbResult<T extends INovaDbObjectType> extends IResolvable {
	obj: T;
}

export interface INovaDbRange<T extends INovaDbObjectType> extends IResolvable {
	skip: number;
	count: number;
	more: boolean;
	objs: T[];
}

export interface IBinaryStreamResult {
	stream: Readable;
	contentType: string;
}

export interface IObjectCountResult {
	count: number;
}

export type WebPageDataProps = NovaDbPropType<
	"navigationTitle" | "seo_nofollow" | "seo_noidex" | "moduleRefs" | "htmlContent"
>;

export interface IWebPage extends INovaDbObjectType, INovaMeta<"webPage"> {
	props: WebPageDataProps;
	references: {
		modules: NovaDbObject[];
	};
}

export interface IProductPage {
	products: IProduct[];
}

export type ProductDataProps = NovaDbPropType<
	| "manufacturerProductDescription"
	| "manufacturerProductDesignation"
	| "productImageRef"
	| "widthOfSensor"
	| "heightOfSensor"
	| "minOperatingAmbientTemperature"
	| "maxOperatingAmbientTemperature"
>;
export type ProductReferences = {
	image: INovaDbImage;
}
export interface IProduct extends INovaDbObjectType, INovaMeta<"product"> {
	props: ProductDataProps;
	references: ProductReferences;
}

export interface INovaDbFormDefinition extends INovaDbObjectType, INovaMeta<"typeForm"> {
	props: NovaDbPropType<"formContent">;
}

export type TitledModule = NovaDbPropType<"title">;

export type TextModuleDataProps = NovaDbPropType<"moduleSize" | "htmlContent"> & TitledModule;
export interface ITextModule extends INovaDbObjectType, INovaMeta<"textModule"> {
	props: TextModuleDataProps;
}

export type MediaModuleDataProps = NovaDbPropType<"moduleSize" | "imageRef" | "htmlContent" | "reverse"> & TitledModule;
export type MediaModuleReferences = {
	image: INovaDbImage;
};
export interface IMediaTextModule extends INovaDbObjectType, INovaMeta<"mediaTextModule"> {
	props: MediaModuleDataProps;
	references: MediaModuleReferences;
}

export type NovaDbImageDataProps = NovaDbPropType<
	"externalBinaryMD5" | "externalBinaryFileExtension" | "exifCopyright"
>;
export interface INovaDbImage extends INovaDbObjectType, INovaMeta<"image"> {
	props: NovaDbImageDataProps;
}

export type ParallaxModuleDataProps = NovaDbPropType<"imageRef" | "moduleSize"> & TitledModule;
export type ParallaxModuleReferences = {
	image: INovaDbImage;
}
export interface IParallaxModule extends INovaDbObjectType, INovaMeta<"parallaxImageModule"> {
	props: ParallaxModuleDataProps;
	references: ParallaxModuleReferences;
}

export type TeaserItemDataProps = NovaDbPropType<"targetRef" | "mediaTextModuleRef">;
export type TeaserItemReferences = {
	mediaText: IMediaTextModule;
	targetLink: string;
};

export interface ITeaserItem extends INovaDbObjectType, INovaMeta<"teaserItem"> {
	props: TeaserItemDataProps;
	references: TeaserItemReferences;
}

export type TeaserModuleDataProps = NovaDbPropType<"teaserItemRefs" | "moduleSize">;
export type TeaserModuleReferences = {
	teaserItems: ITeaserItem[];
};
export interface ITeaserModule extends INovaDbObjectType, INovaMeta<"teaserModule"> {
	props: TeaserModuleDataProps;
	references: TeaserModuleReferences;
}

export type ImageGalleryDataProps = NovaDbPropType<"imageGalleryRefs" | "moduleSize">;
export type ImageGalleryReferences = {
	images: INovaDbImage[];
};
export interface IImageGalleryModule extends INovaDbObjectType, INovaMeta<"imageGalleryModule"> {
	props: ImageGalleryDataProps;
	references: ImageGalleryReferences;
}

export type AccordionModuleDataProps = NovaDbPropType<"moduleSize" | "accordionItemRefs"> & TitledModule;
export type AccordionReferences = {
	accordionItems: INamedAccordionItem[];
};
export interface IAccordionModule extends INovaDbObjectType, INovaMeta<"accordionModule"> {
	props: AccordionModuleDataProps;
	references: AccordionReferences;
}
export type ChartModuleDataProps = NovaDbPropType<"moduleSize" | "chartType" | "chartItemRefs"> & TitledModule
export type ChartModuleReferences = {
	chartItems: IChartItem[]
}

export interface IChartModule extends INovaDbObjectType, INovaMeta<"chartModule"> {
	props: ChartModuleDataProps;
	references: ChartModuleReferences;
}
export type ChartItemDataProps = NovaDbPropType<"chartColor" | "chartValue"> & TitledModule;
export interface IChartItem extends INovaDbObjectType, INovaMeta<"chartElement"> {
	props: ChartItemDataProps;
}
