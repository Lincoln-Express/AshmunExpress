import * as React from "react";
import { SessionState, Auth } from "../types/types";

const initialState = { isSignedIn: false, isLoading: false };

const AuthContext = React.createContext({} as SessionState);

export default AuthContext;
