import axios from "axios";

async function fetcher(url: string): Promise<any> {
  const res = await axios.get(url);

  // if (res.status !== 200) {
  //   const error = new Error("An error occurred while fetching the data. ");

  //   error.info = await res.data;
  //   error.status = res.status;

  //   throw error;
  // }

  return res.data;
}

export default fetcher;
