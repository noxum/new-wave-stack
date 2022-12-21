/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	serverDependenciesToBundle: [
		"swiper",
		"swiper/react",
		"swiper/css",
		"swiper/css/navigation",
		"ssr-window",
		"dom7",
	],
	cacheDirectory: "./node_modules/.cache/remix",
	ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
};
