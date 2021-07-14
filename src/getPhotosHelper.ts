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
  sol: number = 1000,
  page: number =0,
  pageStart: number=0,
  pageEnd: number =0,
) {
  if(!pageStart && !pageEnd){
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&${page?'page='+page+'&':''}camera=${camera}&api_key=${process.env.API_KEY}`;
  console.log(url);
  const { data } = await axios.get(url);
  const photos = trimPhotoData(data.photos);
  return photos;}
}
