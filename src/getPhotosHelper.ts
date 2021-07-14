import axios from "axios";

export async function getPhotosData(
  rover: string,
  camera: string,
  sol: number = 1000
) {
  const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&camera=${camera}&api_key=${process.env.API_KEY}`;
  const { data } = await axios.get(url);
  return data;
}
