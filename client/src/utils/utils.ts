import { User, Appearance } from "../types/types";

export const createUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): User => {
  return {
    firstName,
    lastName,
    email,
    password,
    appearance: Appearance.LIGHT,
    showNotifications: true,
    quizzes: [],
  };
};

export const getEndIndex = (len: number) => {
  if (len < 10) {
    return len;
  }

  return 10;
};
