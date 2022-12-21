import type { RemixLinkProps } from "@remix-run/react/dist/components";
import { Link } from "@remix-run/react/dist/components";
import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface ILinkButtonProps extends RemixLinkProps, React.RefAttributes<HTMLAnchorElement> {
	disabled?: boolean;
}

function LinkButton({ disabled, className, children, ...rest }: ILinkButtonProps) {
	const linkCls = twMerge(className, disabled && "disabled");
	return (
		<Link className={linkCls} {...rest}>
			{children}
		</Link>
	);
}

export { LinkButton };
