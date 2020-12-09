/* eslint-disable @typescript-eslint/ban-types */
import * as React from "react";
import axios from "axios";
import mergeQuizData from "../../utils/mergeQuizData/mergeQuizData";
import transformData from "../../utils/transformData/transformData";

type State = {
  isLoading: boolean;
  isError: boolean;
  data: [];
};

type Action =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: [] }
  | {
      type: "FETCH_FAILURE";
    };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const useFetch = (url: string) => {
  const [state, dispatch] = React.useReducer(reducer, {
    isLoading: false,
    isError: false,
    data: [],
  });

  React.useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const data = await axios.get(url).then((res) => res.data);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: transformData(mergeQuizData(data)),
        });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();
  }, []);

  return state;
};

export default useFetch;
