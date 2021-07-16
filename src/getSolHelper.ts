import axios from "axios";

export type Sollog = {
  rover: string;
  sol: number;
  total_photos: number;
};
export default async function getSolLog(rover: string, sol: number) {
  const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.API_KEY}`;
  const { data } = await axios.get(url);
  let sollog: Sollog = { rover: "", sol: 0, total_photos: 0 };

  if (data.photo_manifest.photos[sol - 1] != undefined) {
    sollog = {
      rover: data.photo_manifest.name,
      sol: data.photo_manifest.photos[sol - 1].sol,
      total_photos: data.photo_manifest.photos[sol - 1].total_photos,
    };
  }
  return sollog;
}
