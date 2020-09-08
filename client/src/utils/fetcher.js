import axios from "axios";

export default async function fetcher(url) {
  const res = await axios.get(url);

  if (res.status !== 200) {
    const error = new Error("An error occurred while fetching the data. ");

    error.info = await res.data;
    error.status = res.status;

    throw error;
  }

  return res.data;
}
