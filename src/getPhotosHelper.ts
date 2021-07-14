import axios from "axios";

type Photo = {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
};

function trimPhoto(photo: Photo): Photo {
  return {
    id: photo.id,
    sol: photo.sol,
    img_src: photo.img_src,
    earth_date: photo.earth_date,
  };
}

function trimPhotoData(bigPhotoData: Photo[]) {
  return bigPhotoData.map((photo) => trimPhoto(photo));
}

export async function getPhotosData(
  rover: string,
  camera: string,
  sol: number = 1000
) {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${process.env.API_KEY}`;
  const { data } = await axios.get(url);
  const photos = trimPhotoData(data.photos);
  return photos;
}
