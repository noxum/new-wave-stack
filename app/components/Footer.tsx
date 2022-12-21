import { Link } from "@remix-run/react";
import { Grid } from "./Grid";
import { Paragraph } from "./Typography";

function Footer() {
	return (
		<footer className="bg-slate-700 py-10">
			<Grid container nested>
				<Paragraph as="h1" className="clear-both text-white sm:order-first md:order-last">
					<Link
						to="/about"
						prefetch="intent"
						title="About"
						className="mr-3 text-sm text-white no-underline hover:opacity-75"
					>
						About Us
					</Link>
					<Link
						to="/imprint"
						prefetch="intent"
						title="Imprint"
						className="mr-3 text-sm text-white no-underline hover:opacity-75"
					>
						Imprint
					</Link>
					<Paragraph as="span" className="mt-3 block text-sm text-white opacity-75">
						© Noxum GmbH 2022
					</Paragraph>
				</Paragraph>
			</Grid>
		</footer>
	);
}

export { Footer };
