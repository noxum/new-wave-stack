import { getRandomNumber } from "../app/utils";

const mockImageSources = [
	"https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg",
	"https://images.pexels.com/photos/1036841/pexels-photo-1036841.jpeg",
	"https://images.pexels.com/photos/1666667/pexels-photo-1666667.jpeg",
];

const mockPanoramaImageSources = [
	"https://images.pexels.com/photos/7919/pexels-photo.jpg",
	"https://images.pexels.com/photos/206353/pexels-photo-206353.jpeg",
	"https://images.pexels.com/photos/258101/pexels-photo-258101.jpeg"
];

export const getRandomImageSrc = () => {
	return mockImageSources[getRandomNumber(3)];
};

export const getRandomPanaromaImageSrc = () => {
	return mockPanoramaImageSources[getRandomNumber(3)];
};;
