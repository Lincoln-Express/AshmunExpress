import axios from "axios";
import fetcher from "./Fetcher";
import BASE_URL from "../../config/index";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const url = `${BASE_URL}/topics`;

describe("fetch data from the server", () => {
  //   test("should fetch topic names", async () => {
  //     const data = [
  //       { topic_name: "Genetics", section_name: "Dihybrid" },
  //       { topic_name: "Genetics", section_name: "Monohybrid" },
  //       { topic_name: "Statistics", section_name: "Probability" },
  //     ];
  //     mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));

  //     // this logic does not work.
  //     await expect(fetcher(url)).resolves.toEqual(data);
  //     expect(axios.get).toHaveBeenCalledWith(url);
  //   });

  test("fetches erroneous data from the server", async () => {
    const errorMessage = "Network Error";

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(fetcher(url)).rejects.toThrow(errorMessage);
  });
});
