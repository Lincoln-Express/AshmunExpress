/* eslint-disable @typescript-eslint/ban-types */
export type State = {
  user: Promise<string | null> | string | undefined | null;
  isLoading: boolean;
};
export type Action =
  | { type: "SET_USER"; payload: Promise<string | null> | string }
  | { type: "DELETE_USER" }
  | {
      type: "SET_LOADING";
      payload: Promise<string | null> | null | string;
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    case "DELETE_USER":
      return {
        ...state,
        user: undefined,
      };
    case "SET_LOADING":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
