import * as React from "react";
import {
  UserAction,
  Dispatch,
  User,
  Appearance,
  ActionType,
  Quiz,
} from "../../types/types";
import { v4 as uuidv4 } from "uuid";

const UserStateContext = React.createContext({} as User);

const UserDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

export const useUserState = () => {
  const context = React.useContext(UserStateContext);
  return context;
};

export const useUserDispatch = () => {
  const context = React.useContext(UserDispatchContext);
  return context;
};

const reducer = (state: User, action: UserAction): User => {
  if (action.type === ActionType.SET_USER) {
    if (action.payload) {
      return action.payload;
    }
  }

  if (action.type === ActionType.ADD_QUIZ) {
    const { quizzes } = state;
    quizzes.push(action.payload);

    return {
      ...state,
      quizzes,
    };
  }

  return state;
};

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  appearance: Appearance.LIGHT,
  showNotifications: false,
  quizzes: [],
};

interface UserProviderProps {
  children: React.ReactNode;
}
const UserProvider: React.FC<UserProviderProps> = ({
  children,
}: UserProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export default UserProvider;
