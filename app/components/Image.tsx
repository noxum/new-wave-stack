import { getRandomImageSrc } from "mocks/images";

export interface IImageProps {
	src: string;
	alt: string;
	width?: string | number;
	height?: string | number;
	className?: string;
}



function Image({ alt, width, height, className }: IImageProps) {
	const src = getRandomImageSrc(); 
	return (
		<picture className={className}>
			<source media="(min-width: 3840px)" srcSet={src} />
			<source media="(min-width: 2048px)" srcSet={`${src}?w=3840`} />
			<source media="(min-width: 1920px)" srcSet={`${src}?w=2048`} />
			<source media="(min-width: 1200px)" srcSet={`${src}?w=1920`} />
			<source media="(min-width: 1080px)" srcSet={`${src}?w=1200`} />
			<source media="(min-width: 828px)" srcSet={`${src}?w=1080`} />
			<source media="(min-width: 750px)" srcSet={`${src}?w=828`} />
			<source media="(min-width: 640px)" srcSet={`${src}?w=750`} />
			<source media="(min-width: 320px)" srcSet={`${src}?w=640`} />
			<source media="(min-width: 1px)" srcSet={`${src}?w=320`} />

			<img src={src} alt={alt} width={width} height={height} className={className} loading="lazy" />
		</picture>
	);
}

export { Image };
