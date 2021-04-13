import * as React from "react";
import {
  SessionState,
  AuthAction,
  Dispatch,
  ActionType,
} from "../../types/types";

const initialState = { user: null, isLoading: false };

const AuthStateContext = React.createContext<SessionState>(initialState);
const AuthDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

export const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  return context;
};

export const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  return context;
};

const reducer = (state: SessionState, action: AuthAction): SessionState => {
  switch (action.type) {
    case ActionType.SET_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case ActionType.DELETE_USER:
      return {
        ...state,
        user: null,
      };
    case ActionType.SET_LOADING:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
export default AuthProvider;
