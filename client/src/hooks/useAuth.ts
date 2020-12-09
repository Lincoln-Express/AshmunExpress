/* eslint-disable no-console */
import * as React from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import BASE_URL from "../config/index";
import reducer, { State } from "./useAuthReducer/useAuthReducer";

type Auth = {
  auth: unknown;
  state: State;
};

const useAuth = (): Auth => {
  const [state, dispatch] = React.useReducer(reducer, {
    user: undefined,
    isLoading: true,
  });

  const auth = () => ({
    login: async (email: string, password: string) => {
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
    register: async (
      firstName: string,
      lastName: string,
      email: string,
      password: string,
    ) => {
      try {
        await axios
          .post(`${BASE_URL}/register`, {
            username: email,
            firstName,
            lastName,
            email,
            password,
          })
          .then((res: unknown) => {
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
  });

  React.useEffect(() => {
    let user: Promise<string | null> | null | string;

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
};

export default useAuth;
