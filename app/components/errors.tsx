import * as React from "react";
import { twMerge } from "tailwind-merge";
import { Grid } from "./Grid";
import { Spacer } from "./Spacer";
import { H2, H3, H5 } from "./Typography";

export interface IErrorPageProps {
	error?: Error;
	title: string | React.ReactNode;
	subTitle?: string | React.ReactNode;
	action?: React.ReactNode;
	image?: React.ReactNode;
}

function RedBox({ error }: { error: Error }) {
	const [isVisible, setIsVisible] = React.useState(true);

	return (
		<div
			className={twMerge(
				"fixed inset-0 z-10 flex items-center justify-center transition",
				!isVisible && "pointer-events-none opacity-0"
			)}
		>
			<button
				className="absolute inset-0 block h-full w-full bg-black opacity-75"
				onClick={() => setIsVisible(false)}
			/>
			<div className="border-lg text-primary mx-5vw max-h-75vh relative my-16 overflow-y-auto rounded-lg bg-red-500 p-12">
				<H2>{error.message}</H2>
				<div>Stack - {error.stack?.toString()}</div>
			</div>
		</div>
	);
}

function ErrorPage({ error, title, subTitle, action, image }: IErrorPageProps) {
	return (
		<>
			<noscript>
				<div
					style={{
						backgroundColor: "black",
						color: "white",
						padding: 30,
					}}
				>
					<h1 style={{ fontSize: "2em" }}>{title}</h1>
					{subTitle && <p style={{ fontSize: "1.5em" }}>{subTitle}</p>}
					<small>Also, this site works much better with JavaScript enabled...</small>
				</div>
			</noscript>

			<Grid as="main" small={true}>
				{process.env.NODE_ENV === "development" && error ? <RedBox error={error} /> : null}
				<H3 as="h2">{title}</H3>
				{subTitle && (
					<div>
						<H5 as="p" variant="secondary" className="mt-3">
							{subTitle}
						</H5>
					</div>
				)}
				<Spacer size="2xs" />
				{action && action}
				{image && image}
			</Grid>
		</>
	);
}

export { ErrorPage };
