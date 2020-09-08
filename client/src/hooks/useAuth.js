/* eslint-disable no-console */
import { useReducer, useEffect, useMemo } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import BASE_URL from "../config/index";
import createAction from "../utils/createAction";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: { ...action.payload },
      };
    case "DELETE_USER":
      return {
        ...state,
        user: undefined,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default function useAuth() {
  const [state, dispatch] = useReducer(reducer, {
    user: undefined,
    loading: true,
  });
  const auth = useMemo(
    () => ({
      login: async (email, password) => {
        axios.interceptors.response.use(
          (response) => response,
          (error) => {
            throw error;
          },
        );
        try {
          await axios
            .post(`${BASE_URL}/auth`, {
              username: email,
              password,
            })
            .then((res) => {
              if (res.data.success) {
                const user = email;

                dispatch(createAction("SET_USER", user));
                SecureStore.setItemAsync("user", JSON.stringify(user));
              } else {
                throw new Error("Couldn't create user");
              }
            });
        } catch (error) {
          if (error.request) {
            console.error(`Login request failed: ${error.request.data}`);
          } else if (error.response) {
            console.error(`Login response failed: ${error.response.data}`);
            console.error(`Login response failed: ${error.response.status}`);
          } else {
            console.error(`error ${error.message}`);
          }
        }
      },
      logout: () => {
        // eslint-disable-next-line no-undef
        SecureStore.deleteItemAsync("user");
        dispatch(createAction("DELETE_USER"));
      },
      register: async (firstName, lastName, email, password) => {
        axios.interceptors.response.use(
          (response) => response,
          (error) => {
            throw error;
          },
        );
        try {
          await axios.post(`${BASE_URL}/register`, {
            username: email,
            firstName,
            lastName,
            email,
            password,
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          if (error.request) {
            console.error(`Register request failed: ${error.request.data}`);
            console.error(`Register request failed: ${error.request.status}`);
          } else if (error.response) {
            console.error(`Register response failed: ${error.response.data}`);
            console.error(`Register response failed: ${error.response.status}`);
          } else {
            console.error(`error ${error.message}`);
          }
        }
      },
    }), // eslint-disable-next-line comma-dangle
    [dispatch],
  );
  useEffect(() => {
    SecureStore.getItemAsync("user").then((user) => {
      if (user) {
        dispatch(createAction("SET_USER", JSON.parse(user)));
      }
      dispatch(createAction("SET_LOADING", false));
    });
  }, []);
  return { auth, state };
}
