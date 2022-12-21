import * as React from "react";
import { twMerge } from "tailwind-merge";

// Great thanks to Kent C. Dodds for providing this nice tiny typography component set 😍
// https://github.com/kentcdodds/kentcdodds.com/blob/main/app/components/typography.tsx

type TitleProps = {
	variant?: "primary" | "secondary";
	as?: React.ElementType;
	className?: string;
	id?: string;
} & (
		| { children: React.ReactNode }
		| {
			dangerouslySetInnerHTML: {
				__html: string;
			};
		}
	);

const fontSize = {
	h1: "leading-tight text-3xl md:text-4xl font-semibold mb-[1.5rem]",
	h2: "leading-tight text-3xl md:text-4xl font-semibold mb-[1.5rem]",
	h3: "text-2xl font-medium md:text-3xl",
	h4: "text-xl font-medium md:text-2xl",
	h5: "text-lg font-medium md:text-xl",
	h6: "text-lg font-medium",
};

const titleColors = {
	primary: "text-black",
	secondary: "text-gray-400",
};

function Title({ variant = "primary", size, as, className, ...rest }: TitleProps & { size: keyof typeof fontSize }) {
	const Tag = as ?? size;
	return <Tag className={twMerge(fontSize[size], titleColors[variant], className)} {...rest} />;
}

function H1(props: TitleProps) {
	return <Title {...props} size="h1" />;
}

function H2(props: TitleProps) {
	return <Title {...props} size="h2" />;
}

function H3(props: TitleProps) {
	return <Title {...props} size="h3" />;
}

function H4(props: TitleProps) {
	return <Title {...props} size="h4" />;
}

function H5(props: TitleProps) {
	return <Title {...props} size="h5" />;
}

function H6(props: TitleProps) {
	return <Title {...props} size="h6" />;
}

type ParagraphProps = {
	className?: string;
	prose?: boolean;
	textColorClassName?: string;
	as?: React.ElementType;
} & ({ children: React.ReactNode } | { dangerouslySetInnerHTML: { __html: string } });

function Paragraph({
	className,
	prose = true,
	as = "p",
	textColorClassName = "text-secondary",
	...rest
}: ParagraphProps) {
	return React.createElement(as, {
		className: twMerge(
			"max-w-full text-lg",
			textColorClassName,
			className,
			prose && "prose prose-dark"
		),
		...rest,
	});
}

export { H1, H2, H3, H4, H5, H6, Paragraph };
