import { rest } from "msw";
import resolvedIndexMock from "./index.page.resolved.mock.json";
import resolvedCompaynOnePager from "./company-onepager.page.resolved.mock.json";
import resolvedSitemapMock from "./sitemap.page.resolved.mock.json";
import resolvedImprintMock from "./imprint.page.resolved.mock.json";
import resolvedAboutMock from "./about.page-resolved.mock.json";
import companyPageMock from "./onepager.mock.json";
import productsPageMock from "./product-page.mock.json";
import productsMock from "./products.mock.json";
import singlProductMock from "./single.product.mock.json";
import sitemapMock from "./sitemap.mock.json";
import formDefinitionMock from "./formDefinition.mock.json";
import { INovaDbRange, IProduct, ObjectType } from "~/api/api.types";


const deliveryApiHandlers = [
	rest.get(
		`[API_ENDPOINT]branches/:branch/types/:type/objects`,
		(req, res, ctx) => {
			const type = req.params["type"] as ObjectType;
			const filter = req.url.searchParams.get("filter");
			if (type === "webPage") {
				switch (filter) {
					case 'displayName:"index"': {
						return res(ctx.json(resolvedIndexMock));
					}
					case 'displayName:"company-onepager"': {
						return res(ctx.json(resolvedCompaynOnePager));
					}
					case 'displayName:"sitemaps"': {
						return res(ctx.json(resolvedSitemapMock));
					}
					case 'displayName:"imprint"': {
						return res(ctx.json(resolvedImprintMock));
					}
					case 'displayName:"about"': {
						return res(ctx.json(resolvedAboutMock));
					}
					case 'displayName:"products"': {
						return res(ctx.json(resolvedAboutMock));
					}
				}
			}
			if (type === "product") {
				const skipParam = req.url.searchParams.get("skip");
				const takeParam = req.url.searchParams.get("take");
				let mock = (JSON.parse(JSON.stringify(productsMock))) as INovaDbRange<IProduct>;
				mock.skip = skipParam && typeof skipParam === "string" ? parseInt(skipParam) : 0;
				if (takeParam && typeof takeParam === "string") {
					const take = parseInt(takeParam);
					mock.objs = mock.objs.slice(0, take);
				}
				return res(ctx.json(mock));
			}
		}
	),
	rest.get(
		`[API_ENDPOINT]branches/:branch/types/:type/objects/:id`,
		(req, res, ctx) => {
			const type = req.params["type"] as ObjectType;
			switch (type) {
				case "product":
					return res(ctx.json(singlProductMock));
			}
		}
	),

	rest.get(
		`[API_ENDPOINT]branches/:branch/objects/:id`,
		(req, res, ctx) => {
			const objectId = parseInt(req.params["id"] as string);
			switch (objectId) {
				case 2126513:
					return res(ctx.json(companyPageMock));
				case 2123805:
					return res(ctx.json(productsPageMock));
				case 2137744:
					return res(ctx.json(sitemapMock));
				case 2137702:
					return res(ctx.json(formDefinitionMock));
				default:
					// For all others we mock a product details page :-) 
					return res(ctx.json(singlProductMock));
			}
		}
	),
	rest.get(
		`[API_ENDPOINT]branches/:branch/types/:type/count`,
		(_req, res, ctx) => {
			return res(
				ctx.json({
					count: 100,
				})
			);
		}
	),
];
export { deliveryApiHandlers };
