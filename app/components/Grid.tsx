import * as React from "react";
import { twMerge } from "tailwind-merge";
import type { IContainerProps } from "./types";

interface GridProps extends IContainerProps {
	children: React.ReactNode;
	overflow?: boolean;
	className?: string;
	as?: React.ElementType;
	contentRow?: boolean;
	container?: boolean;
}

const Grid = React.forwardRef<HTMLElement, GridProps>(function Grid(
	{ children, className, as: Tag = "div", nested, contentRow, small, medium, container },
	ref
) {
	const classNames = twMerge(
		"col-span-12",
		small && "md:col-span-6 lg:col-span-3",
		medium && "md:col-span-6",
		contentRow && "grid grow grid-flow-row grid-cols-12 gap-x-0 pb-5 pt-5 sm:gap-x-10",
		nested ? "mt-0 mb-0" : "mt-5 mb-5",
		container && "container mx-auto w-[calc(100vw-2.5rem)]",
		className
	);

	return (
		<Tag ref={ref} className={classNames}>
			{children}
		</Tag>
	);
});

export { Grid };
