import { getRandomPanaromaImageSrc } from "mocks/images";
import { ParallaxModuleDataProps, ParallaxModuleReferences } from "~/api/api.types";
import { Paragraph } from "~/components/Typography";

export interface IParallaxImageModuleProps extends ParallaxModuleDataProps, ParallaxModuleReferences {
}

export default function ParallaxImageModule({ image, title }: IParallaxImageModuleProps) {
	const mockedSource = getRandomPanaromaImageSrc();
	return image ? (
		<div
			className="parallaximage b-10 grid h-[50vh] place-items-center bg-cover bg-fixed bg-center px-10 py-10 md:py-28"
			style={{
				backgroundImage: `url(${mockedSource})`,
			}}
		>
			{title && (
				<Paragraph className="mx-auto inline-block h-fit max-w-max rounded-sm bg-white bg-opacity-75 px-10 py-5 text-2xl font-semibold text-slate-700 drop-shadow-md">
					{title as string ?? ""}
				</Paragraph>
			)}
		</div>
	) : null;
}
