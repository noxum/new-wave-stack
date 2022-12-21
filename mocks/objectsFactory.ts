import type {IChartItem, INovaDbImage, INovaDbObjectType, IProduct, NovaDbObject } from "~/api/api.types";

export interface IObjectsFactory {
	modules: INovaDbObjectType[];
	images: INovaDbObjectType[];
	products: INovaDbObjectType[];
	chartItems: INovaDbObjectType[];
}

const getImages = (): (INovaDbImage)[] => {
	return [
		{
			displayName: "Image",
			displayIcon: 62,
			meta: {
				id: 1212121,
				guid: "0d5f4194-f761-4285-8265-3be05fd54796",
				typeRef: 2100996,
				type: "image",
				language: "en-EN",
				deleted: false,
				etag: "BaMIjOZlM7zmiGNDXyvXCw",
				lastModified: "2021-03-01T12:34:48.9996635Z",
				lastTransaction: 4368,
			},
			props: {
				externalBinaryFileExtension: ".png",
				externalBinaryMD5: "749ae080-5dab-d6e7-20e1-99270a02040a",
				exifCopyright: "Noxum GmbH"
			},
		},
		{
			displayName: "Image",
			displayIcon: 62,
			meta: {
				id: 1212122,
				guid: "0d5f4194-f761-4285-8265-3be05fd54797",
				typeRef: 2100996,
				type: "image",
				language: "en-EN",
				deleted: false,
				etag: "BaMIjOZlM7zmiGNDXyvXCw",
				lastModified: "2021-03-01T12:34:48.9996635Z",
				lastTransaction: 4368,
			},
			props: {
				externalBinaryFileExtension: ".jpg",
				externalBinaryMD5: "c4f474dc-8224-d77c-7800-9745f0281558",
				exifCopyright: "Noxum GmbH"
			},
		},
		{
			displayName: "Image",
			displayIcon: 62,
			meta: {
				id: 1212123,
				guid: "0d5f4194-f761-4285-8265-3be05fd54798",
				typeRef: 2100996,
				type: "image",
				language: "en-EN",
				deleted: false,
				etag: "BaMIjOZlM7zmiGNDXyvXCw",
				lastModified: "2021-03-01T12:34:48.9996635Z",
				lastTransaction: 4368,
			},
			props: {
				externalBinaryFileExtension: ".jpg",
				externalBinaryMD5: "6c5b0a98-e035-6a44-5f9a-4ad07fdb9bc0",
				exifCopyright: "Noxum GmbH"
			},
		},
	];
};

const getModules = (): (NovaDbObject)[] => {
	return [
		{
			displayName: `Mocked-1111111`,
			displayIcon: 62,
			meta: {
				id: 1111111,
				type: "textModule",
				language: "en-EN",
				guid: "e888c97a-18f2-433c-8199-7d43790a1009",
				deleted: false,
				etag: "BaMIjOZlM7zmiGNDXyvXCw",
				lastModified: "2022-01-11T06:40:12.7329692Z",
				lastTransaction: 28000,
				typeRef: 0,
			},
			props: {
				title: "Text Module Title",
				htmlContent: { XML: "<div><h1>I am a TextModule</h1></div>" },
			},
		},
		{
			displayName: `Mocked-2222222`,
			displayIcon: 62,
			meta: {
				id: 2222222,
				type: "parallaxImageModule",
				language: "en-EN",
				guid: "e888c97a-18f2-433c-8199-7d43790a1009",
				deleted: false,
				etag: "BaMIjOZlM7zmiGNDXyvXCw",
				lastModified: "2022-01-11T06:40:12.7329692Z",
				lastTransaction: 28000,
				typeRef: 0,
			},
			props: { imageRef: 1212121 },
		},
		{
			displayName: `Mocked-3333333`,
			displayIcon: 62,
			meta: {
				id: 3333333,
				type: "mediaTextModule",
				language: "en-EN",
				guid: "e888c97a-18f2-433c-8199-7d43790a1009",
				deleted: false,
				etag: "BaMIjOZlM7zmiGNDXyvXCw",
				lastModified: "2022-01-11T06:40:12.7329692Z",
				lastTransaction: 28000,
				typeRef: 0,
			},
			props: {
				title: "Media Text Module",
				htmlContent: { XML: "<div><h1>Content of media text module</h1></div>" },
				imageRef: 1212121,
			},
		},
		{
			displayName: `Mocked-4444444`,
			displayIcon: 62,
			meta: {
				id: 4444444,
				type: "videoModule",
				language: "en-EN",
				guid: "e888c97a-18f2-433c-8199-7d43790a1009",
				deleted: false,
				etag: "BaMIjOZlM7zmiGNDXyvXCw",
				lastModified: "2022-01-11T06:40:12.7329692Z",
				lastTransaction: 28000,
				typeRef: 0,
			},
			props: {
				youtubeLink: "https://youtu.be/uELEYbls7jY",
			},
		},
		{
			displayName: `Mocked-5555555`,
			displayIcon: 62,
			meta: {
				id: 5555555,
				type: "imageGalleryModule",
				language: "en-EN",
				guid: "e888c97a-18f2-433c-8199-7d43790a1009",
				deleted: false,
				etag: "BaMIjOZlM7zmiGNDXyvXCw",
				lastModified: "2022-01-11T06:40:12.7329692Z",
				lastTransaction: 28000,
				typeRef: 0,
			},
			props: {
				moduleSize: "medium",
				imageGalleryRefs: [1212122, 1212123],
			},
		},
		{
			displayName: `Mocked-6666666`,
			displayIcon: 62,
			meta: {
				id: 6666666,
				type: "chartModule",
				language: "en-EN",
				guid: "e888c97a-18f2-433c-8199-7d43790a1009",
				deleted: false,
				etag: "BaMIjOZlM7zmiGNDXyvXCw",
				lastModified: "2022-01-11T06:40:12.7329692Z",
				lastTransaction: 28000,
				typeRef: 0,
			},
			props: {
				attributeName: "Mocked-6666666",
				chartType: "bar",
				chartItemRefs: [6666111, 6666112, 6666113],
			},
		},
	];
};

const getProducts = (): (IProduct)[] => {
	return [
		{
			displayName: "Mocked Product 1",
			displayIcon: 62,
			meta: {
				id: 1111111,
				guid: "822e3b05-e8b3-492f-b64f-db7aa5d9be05",
				type: "product",
				language: "en-EN",
				typeRef: 2112986,
				deleted: false,
				etag: "BaMIjOZlM7zmiGNDXyvXCw",
				lastModified: "2022-04-28T09:31:17.1901199Z",
				lastTransaction: 7019,
			},
			props: {
				manufacturerProductDescription: " Proximity Sensors , Inductive Sensors, Standard Sensors, Non-Safety",
				manufacturerProductDesignation: "Inductive sensor 3RG4022-3CD00-PF",
				productImageRef: [2122062],
				heightOfSensor: 10,
				maxOperatingAmbientTemperature: 120,
				minOperatingAmbientTemperature: -50,
				widthOfSensor: 200
			},
		},
		{
			displayName: "Mocked Product 2",
			displayIcon: 62,
			meta: {
				id: 2222222,
				guid: "35d4aa7a-98e4-492d-9de2-fa3b55f6d7cc",
				type: "product",
				language: "en-EN",
				typeRef: 2112986,
				deleted: false,
				etag: "BaMIjOZlM7zmiGNDXyvXCw",
				lastModified: "2022-04-28T09:31:17.1901199Z",
				lastTransaction: 7019,
			},
			props: {
				manufacturerProductDescription: " Proximity Sensors , Inductive Sensors, Standard Sensors, Non-Safety",
				manufacturerProductDesignation: "Inductive sensor 3RG4031-3AG01-PF",
				productImageRef: [2122066],
				heightOfSensor: 20,
				maxOperatingAmbientTemperature: 520,
				minOperatingAmbientTemperature: 0,
				widthOfSensor:150 

			},
		},
	];
};

const getChartItems = (): (IChartItem)[] => {
	return [
		{
			displayName: "Prozent",
			displayIcon: 79,
			meta: {
				id: 6666111,
				guid: "22413d5d-0ce7-4db4-a657-08f2ce3b32f7",
				type: "chartElement",
				language: "en-EN",
				typeRef: 2101147,
				deleted: false,
				lastModified: "2021-05-04T09:19:38.9090814Z",
				lastTransaction: 6462,
				etag: "QHOSKTSzLcwRBBk1Vv-Jdw",
			},
			props: {
				title: "Prozent",
				chartValue: 50,
				chartColor: "#1e1a3c",
			},
		},
		{
			displayName: "Kosten",
			displayIcon: 79,
			meta: {
				id: 6666112,
				guid: "5902437d-871b-4c62-acba-91175da433bf",
				type: "chartElement",
				language: "en-EN",
				typeRef: 2101147,
				deleted: false,
				lastModified: "2021-03-04T07:38:03.4543074Z",
				lastTransaction: 4474,
				etag: "A0YIqT6BRLdluFImOQJt8A",
			},
			props: {
				title: "Kosten",
				chartValue: 21.6,
				chartColor: "#1e1a3c",
			},
		},
		{
			displayName: "mangelndes Know-how",
			displayIcon: 79,
			meta: {
				id: 6666113,
				guid: "48045a04-3005-4adc-9249-e207a87aaafc",
				type: "chartElement",
				language: "en-EN",
				typeRef: 2101147,
				deleted: false,
				lastModified: "2021-03-04T07:38:50.5480801Z",
				lastTransaction: 4475,
				etag: "6ZavpM6mizAADV_T0r4tEg",
			},
			props: {
				title: "mangelndes Know-how",
				chartValue: 35.9,
				chartColor: "#1e1a3c",
			},
		},
	];
};

export const objectsFactory = (): IObjectsFactory => {
	const modules = getModules();
	const images = getImages();
	const products = getProducts();
	const chartItems = getChartItems();
	const objectsFactory: IObjectsFactory = {
		modules,
		images,
		products,
		chartItems,
	};
	return objectsFactory;
};
