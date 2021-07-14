import axios from "axios";

export async function getRovers () {
const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=${process.env.API_KEY}`;
const {data} = await axios.get(url);
return data;
}