import axios from "axios";

const fetcher = async (url: string): Promise<any> => {
  await axios.get(url).then((res) => res.data);
};

export default fetcher;
