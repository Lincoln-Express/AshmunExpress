import axios from "axios";
import fetcher from "./fetcher";
import BASE_URL from "../config/index";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const url = `${BASE_URL}/topics`;

describe("fetch data from the server", () => {
  test("fetches erroneous data from the server", async () => {
    const errorMessage = "Network Error";

    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(fetcher(url)).rejects.toThrow(errorMessage);
  });
});
