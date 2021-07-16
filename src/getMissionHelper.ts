import axios from "axios";
export type Mission = {
  rover: string;
  max_sol: number;
};

export default async function getMission(rover: string) {
  const url = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${process.env.API_KEY}`;
  const { data } = await axios.get(url);
  const mission: Mission ={rover:data.photo_manifest.name, max_sol: data.photo_manifest.max_sol}
  return mission;
}
