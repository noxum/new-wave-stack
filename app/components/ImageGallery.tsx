import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ImageGalleryDataProps, ImageGalleryReferences } from "~/api/api.types";
import { Image } from "~/components/Image";
import { Grid } from "./Grid";
export interface IImageGalleryProps extends ImageGalleryDataProps, ImageGalleryReferences {}

export default function ImageGallery({ images, moduleSize }: IImageGalleryProps) {
	const moduleSizeProp = moduleSize ? { [moduleSize as string]: true } : {};
	
	return (
		<Grid {...moduleSizeProp}>
			<Swiper navigation={true} modules={[Navigation]} className="rounded-sm shadow-lg">
				{images.map((image) => (
					<SwiperSlide key={image.props.externalBinaryMD5 as string}>
						<Image
							src={`/image/${image.props.externalBinaryMD5}${image.props.externalBinaryFileExtension}`}
							alt={image.displayName}
							className="w-full"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</Grid>
	);
}
