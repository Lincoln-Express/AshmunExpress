import axios from "axios";
import capitalize from "lodash/capitalize";
import snakeCase from "lodash/snakeCase";
import * as converter from "number-to-words";
import { User, Appearance, Mode } from "../types/types";

const mapObject = require("map-obj");

export const createUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  // if (
  //   firstName.length == 0 ||
  //   lastName.length == 0 ||
  //   email.length == 0 ||
  //   password.length == 0
  // ) {
  //   return null;
  // }
  return {
    firstName: firstName,
    lastName: lastName,
    email,
    password,
    appearance: Appearance.LIGHT,
    showNotifications: true,
    modes: [] as Mode[],
  };
};

export const getEndIndex = (len: number) => {
  if (len < 10) {
    return len;
  }

  return 10;
};

export const getResultReview = (
  correctAnswersCount: number,
  median: number,
  upperQuartile: number,
  mode: string,
): string => {
  if (mode === "Tutorial" || mode === "Example") {
    return "Great Job";
  }
  if (correctAnswersCount <= median) {
    return "Let's Practice More";
  }
  if (correctAnswersCount > median && correctAnswersCount <= upperQuartile) {
    return "Nice Attempt";
  }

  return "Great Job";
};

export const changeObjectPropsName = (
  arr: any[],
): Array<{ title: string; data: Array<string> }> => {
  return arr.map((val) => ({
    title: val.topic_name,
    data: val.section_name,
  }));
};

export const mergeModeData = (
  data: Array<{ topic_name: string; section_name: string }> | undefined,
): Array<{ topic_name: string; section_name: Array<string> }> => {
  const result: Array<{ topic_name: string; section_name: Array<string> }> = [];
  if (data === undefined) {
    return result;
  }
  data.forEach((item) => {
    const existing = result.filter((val) => {
      return val.topic_name === item.topic_name;
    });

    if (existing.length) {
      const index = result.indexOf(existing[0]);
      result[index].section_name = result[index].section_name.concat(
        item.section_name,
      );
    } else {
      item.section_name = [item.section_name];
      result.push(item);
    }
  });

  return result;
};

export const fetcher = async (url: string) =>
  await axios.get(url).then((res) => res.data);

export const changePropsToSnakeCase = (object) => {
  return mapObject(object, (key, value) => [snakeCase(String(key)), value], {
    deep: true,
  });
};

export const customText = (firstText: string, secondText: string) => {
  return `${firstText} ${secondText}`;
};

export const getGreetingText = (hours: number) => {
  if (hours < 12) {
    return "Good Morning";
  } else if (hours >= 12 && hours < 16) {
    return "Good Afternoon";
  }

  return "Good evening";
};

export const getModeHistoryText = (modesArrayLength: number | undefined) => {
  if (!modesArrayLength) {
    return "";
  }

  if (modesArrayLength === 1) {
    return "Last Result:";
  }
  if (modesArrayLength < 5) {
    const numInWords = converter.toWords(modesArrayLength);
    const resultWord = modesArrayLength === 1 ? "Result:" : "Results:";
    return `Last ${capitalize(numInWords)} ${resultWord}`;
  }

  return "Last Five Results:";
};
