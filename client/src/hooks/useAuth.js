/* eslint-disable no-console */
import { useReducer, useEffect, useMemo } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import BASE_URL from "../config/index";

// use loading in app.jsx, and remove the loading states in both loginScreen and registrationScreen
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
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

export default function useAuth() {
  const [state, dispatch] = useReducer(reducer, {
    user: undefined,
    isLoading: true,
  });

  const auth = useMemo(
    () => ({
      login: async (email, password) => {
        try {
          await axios
            .post(`${BASE_URL}/auth`, {
              username: email,
              password,
            })
            .then((res) => {
              if (res.data && SecureStore.getItemAsync("user")) {
                const user = SecureStore.getItemAsync("user");

                dispatch({ type: "SET_USER", payload: user });
              } else {
                throw new Error("Couldn't find user");
              }
            });
        } catch (error) {
          if (error.request) {
            console.error(`Login request failed: ${error.request}`);
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
        const user = SecureStore.deleteItemAsync("user");
        if (user) {
          dispatch({ type: "DELETE_USER" });
        }
      },
      register: async (firstName, lastName, email, password) => {
        try {
          await axios
            .post(`${BASE_URL}/register`, {
              username: email,
              firstName,
              lastName,
              email,
              password,
            })
            .then((res) => {
              const user = `${firstName}-${lastName}-${email}`;

              dispatch({ type: "SET_USER", payload: user });
              SecureStore.setItemAsync("user", JSON.stringify(user));
            });
        } catch (error) {
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
    [],
  );

  useEffect(() => {
    let user;

    const fetchUser = async () => {
      try {
        user = await SecureStore.getItemAsync("user");
      } catch (e) {
        console.error(`Restoring user error: ${e.message}`);
      }

      dispatch({ type: "SET_LOADING", payload: user });
    };
    fetchUser();
  }, []);

  return { auth, state };
}
