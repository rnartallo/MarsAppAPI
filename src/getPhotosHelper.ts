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

async function getDataFromPage(page: number, url: string) {
  const pageUrl = `${url}+${page ? "&page=" + page : ""}`;
  const { data } = await axios.get(pageUrl);
  const photos = trimPhotoData(data.photos);
  console.log(photos);
  return photos;
}

export async function getPhotosData(
  rover: string,
  camera: string,
  sol: number = 1000,
  page: number = 0,
  pageStart: number = 0,
  pageEnd: any = undefined
) {
  let photos: Photo[] = [];
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${process.env.API_KEY}`;
  if (!pageStart && !pageEnd) {
    photos = await getDataFromPage(page, url);
  } else {
    let i = Math.max(pageStart, 1);
    let endFound = false;
    if (!pageEnd) {
      while (!endFound) {
        let photoData = await getDataFromPage(i, url);
        photos = photos.concat(photoData);
        if (!photoData) {
          endFound = true;
        }
        i += 1;
      }
    } else {
      while (i <= pageEnd && !endFound) {
        let photoData = await getDataFromPage(i, url);
        photos = photos.concat(photoData);
        if (!photoData) {
          endFound = true;
        }
        i += 1;
      }
    }
  }
  return photos;
}
