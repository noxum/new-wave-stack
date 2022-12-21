import { resolveObjectReferences, toReferenceMap } from "~/entry.server";
import { getRandomNumber } from "~/utils";
import type { INovaDbFormDefinition, IProduct } from "./api.types";
import { getObject, getObjectByType, getObjectCount, listObjects } from "./novaDb";

export const DEFAULT_PRODCUT_PAGE_SIZE = 20;

/**
 * Get product details including the product's references
 * @param productId
 * @returns Product object with its resolved references
 */
async function getProductDetails(productId: number) {
	if (!productId) return null;

	const productWithRefs = await getObjectByType<IProduct>(productId, "product", "productImageRef");
	const objectReferences = toReferenceMap(productWithRefs.refs);
	await resolveObjectReferences(productWithRefs.obj, objectReferences);
	return productWithRefs;
}

/** Loads a random list of four products */
async function getProductRecommendations() {
	const randomProductSkip = getRandomNumber(100);
	const products = await listObjects<IProduct>(
		"product",
		"productImageRef",
		"",
		undefined,
		randomProductSkip,
		4
	);
	const productImageRefs = toReferenceMap(products.refs);
	for (const relatedProduct of products.objs) {
		await resolveObjectReferences(relatedProduct, productImageRefs);

	}
	return products;
}
/**
 * Loads the product form definition
 */
async function getProductFormDetails() {
	// We provide a well-known system object id
	const formDefinition = await getObject<INovaDbFormDefinition>(2137702, "formContent");
	const attributeMapping = formDefinition.obj.props.formContent as number[];
	if (formDefinition.refs === undefined) {
		throw new Error(`Product form definition not found`);
	}

	const references = toReferenceMap(formDefinition.refs);
	return attributeMapping.map((refId) => {
		const reference = references.get(refId);
		if (!reference) return null;
		return {
			apiIdentifier: reference.meta.apiIdentifier,
			displayName: reference.displayName,
		};
	});
}

/**
 * Get a batch of products
 * @param page paging index 
 * @param pageSize number of products per page
 * @returns products
 */
async function getProducts(page: number = 1, pageSize: number = DEFAULT_PRODCUT_PAGE_SIZE) {

	const range = await listObjects<IProduct>(
		"product",
		"",
		"",
		"displayName",
		(page - 1) * pageSize,
		pageSize
	);

	return range;
}

/**
 * Get products count
 * @returns Total number of products
 */
async function getProductsCount() {
	return await getObjectCount("product");
}


export { getProducts, getProductDetails, getProductFormDetails, getProductRecommendations, getProductsCount }
