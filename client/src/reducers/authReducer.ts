import { SessionState, AuthAction, ActionType, User } from "../types/types";

const initialState = { isSignedIn: false, isLoading: false, user: {} as User };
const authReducer = (state: SessionState, action: AuthAction): SessionState => {
  if (action.type === ActionType.SET_LOADING) {
    return {
      ...state,
      isLoading: true,
      isSignedIn: false,
    };
  }

  if (action.type === ActionType.SIGN_IN) {
    return {
      ...state,
      isLoading: false,
      isSignedIn: true,
      user: action.payload,
    };
  }

  if (action.type === ActionType.SIGN_OUT) {
    return initialState;
  }
  return state;
};

export default authReducer;
