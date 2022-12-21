import type { HeadersFunction, LinksFunction, MetaFunction } from "@remix-run/node";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";
import appStylesheetUrl from "./styles/app.css";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import { defaultCacheHeaders } from "./entry.server";

import swiperCss from "swiper/css";
import navigationSwiperCss from "swiper/css/navigation";

// Default Headers
export let headers: HeadersFunction = () => {
	return defaultCacheHeaders();
};

export const links: LinksFunction = () => {
	return [
		{ rel: "stylesheet", href: appStylesheetUrl },
		{ rel: "stylesheet", href: tailwindStylesheetUrl },
		{ rel: "stylesheet", href: swiperCss },
		{ rel: "stylesheet", href: navigationSwiperCss },
	];
};

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Nova WebCatalog",
	viewport: "width=device-width,initial-scale=1",
});

export default function App() {
	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>

			<body className="flex h-screen flex-col bg-white">
				{/* Page Header */}
				<Header />
				{/* Page Content */}
				<main className="mt-[44px] flex-grow lg:mt-[84px]">
					<Outlet />
				</main>
				{/* Page Footer */}
				<Footer />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
/*
export function ErrorBoundary(error: Error) {
	console.error(`
		Hit ErrorBoundary: ${error.message}\n
		--/n
		${error.stack?.toString()}
	`);
	const location = useLocation();
	return (
		<html lang="en">
			<head>
				<title>Oops</title>
				<Meta />
				<Links />
			</head>
			<body className="bg-white">
				<div className="flex h-screen flex-col">
					<Header />
					<div id="main" className="flex-grow">
						<ErrorPage
							title={"500 - Oh no, something did not go well."}
							subTitle={`"${location.pathname}" is currently not working. So sorry.`}
							error={error}
							action={<Link to="/">Go home</Link>}
						/>
					</div>
					<Footer />
					<Scripts />
				</div>
			</body>
		</html>
	);
}*/

