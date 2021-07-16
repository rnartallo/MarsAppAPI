import axios from "axios";

export type Sollog = {
  rover: string;
  sol: number;
  total_photos: number;
};
export default async function getSolLog(rover: string, sol: number) {
  const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.API_KEY}`;
  const { data } = await axios.get(url);
  const photos: any[] = data.photo_manifest.photos;
  const day: any = photos[sol - 1];
  const sollog: Sollog = {
    rover: rover,
    sol: sol,
    total_photos: day.total_photos,
  };
  return sollog;
}
