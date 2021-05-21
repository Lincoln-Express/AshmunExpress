import * as React from "react";
import { User } from "../types/types";

const UserContext = React.createContext({
  user: {} as User,
  updateUser: (newValue, attribute) => {},
});

export default UserContext;
