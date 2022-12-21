import { Grid } from "./Grid";

export interface IVideoModuleProps {
	youtubeLink: string;
}

function VideoModule({ youtubeLink }: IVideoModuleProps) {
	const segments = youtubeLink.split("/");
	if (segments.length === 0) {
		console.error(` ${youtubeLink} is not a valid youtube link`);
		return null;
	}
	const id = segments[segments.length - 1];
	return (
		<Grid large className="relative h-0 pb-[56.25%]">
			<iframe
				width="560"
				height="315"
				src={`https://youtube.com/embed/${id}`}
				title="YouTube video player"
				frameBorder="0"
				allowFullScreen
				className="absolute top-0 left-0 h-full w-full"
			></iframe>
		</Grid>
	);
}

export { VideoModule };
