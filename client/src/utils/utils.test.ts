import axios from "axios";
import * as utils from "./utils";
import { Appearance } from "./../types/types";
import BASE_URL from "../config/index";

const {
  createUser,
  getEndIndex,
  getResultReview,
  fetcher,
  mergeModeData,
} = utils;

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const url = `${BASE_URL}/topics`;

describe("Tests for fetching data from the server", () => {
  test("fetches data successfully from the server", async () => {
    mockedAxios.get.mockResolvedValueOnce({ status: 200, data });

    await expect(fetcher(url)).resolves.toEqual(data);
  });

  test("fetches erroneous data from the server", async () => {
    const errorMessage = "Network Error";

    mockedAxios.get.mockRejectedValueOnce(new Error(errorMessage));
    await expect(fetcher(url)).rejects.toThrow(errorMessage);
  });
});

const data = [
  {
    topic_name: "Genetics",
    section_name: "Dihybrid",
  },
  {
    topic_name: "Genetics",
    section_name: "Monohybrid",
  },
  {
    topic_name: "Statistics",
    section_name: "Probability",
  },
];

describe("Tests for validating merged objects with section_name and topic_name properties", () => {
  test("a section object has its appropriate topic names as properties", () => {
    const result = mergeModeData(data);
    expect(result[0]?.topic_name).toEqual("Genetics");
  });
});

describe("Tests for validating the createUser function", () => {
  test("given valid params, createUser() returns a User Object", () => {
    const user = createUser("Chidera", "Iguwe", "stuff@stuff.com", "password");

    expect(user).not.toBe(null);
    expect(user).toEqual({
      firstName: "Chidera",
      lastName: "Iguwe",
      email: "stuff@stuff.com",
      password: "password",
      showNotifications: true,
      modes: [],
      appearance: Appearance.LIGHT,
    });
  });

  test("given an invalid param, createUser() returns null", () => {
    const user = createUser("Chidera", "", "stuff@stuff.com", "");

    expect(user).toBe(null);
    expect(user).not.toEqual({
      firstName: "Chidera",
      lastName: "Iguwe",
      email: "stuff@stuff.com",
      password: "password",
      showNotifications: true,
      modes: [],
      appearance: Appearance.LIGHT,
    });
  });
});

describe("Tests for validating the getEndIndex function", () => {
  test("given a valid param, getEndIndex() returns the expected value", () => {
    expect(getEndIndex(9)).toBe(9);
    expect(getEndIndex(15)).toBe(10);
  });
});

describe("Tests for validating the getResultReview function", () => {
  test("given valid params, getResultReview returns the expected value", () => {
    const lowerQuartile = 0.25 * 10;
    const upperQuartile = 3 * lowerQuartile;
    const median = upperQuartile - lowerQuartile;

    expect(getResultReview(10, 5, lowerQuartile, median, upperQuartile)).toBe(
      "You can do better!",
    );
    expect(getResultReview(10, 8, lowerQuartile, median, upperQuartile)).toBe(
      "Awesome!",
    );
    expect(getResultReview(10, 2, lowerQuartile, median, upperQuartile)).toBe(
      "Not good enough!",
    );
  });
});
