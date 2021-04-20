import * as React from "react";
import { Appearance, User, Quiz } from "../types/types";

const UserContext = React.createContext({
  user: {
    firstName: "",
    lastName: "",
    appearance: Appearance.LIGHT,
    email: "",
    password: "",
    quizzes: [] as Quiz[],
  },
  updateUser: (newValue, attribute) => {},
});

export default UserContext;
