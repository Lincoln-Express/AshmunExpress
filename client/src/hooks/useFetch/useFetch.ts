import useSWR from "swr";
import BASE_URL from "../../config";
import { fetcher } from "../../utils/utils";

const useFetch = (
  keyword: string | number,
): { data: [] | undefined; isLoading: boolean; isError: boolean } => {
  const { data, error } = useSWR(`${BASE_URL}/${keyword}`, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useFetch;
