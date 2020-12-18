import * as React from "react";
import { Auth } from "../hooks/useAuth";

const AuthContext = React.createContext({} as Auth);

export default AuthContext;
