import { useAuthState } from "./../../providers/authProvider/AuthProvider";
import * as React from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import BASE_URL from "../../config/index";
import { useAuthDispatch } from "../../providers/authProvider/AuthProvider";
import { createUser } from "../../utils/utils";
import { ActionType } from "../../types/types";

const useAuth = () => {
  const dispatch = useAuthDispatch();
  const stuff = useAuthState().user;

  const auth = {
    login: async (email: string, password: string) => {
      try {
        console.log("1" + stuff);
        await axios
          .post(`${BASE_URL}/auth`, {
            username: email,
            password,
          })
          .then(async (res) => {
            if (res.data.success) {
              const user = await SecureStore.getItemAsync("user");
              if (user) {
                if (dispatch) {
                  console.log("Dispatch works!");
                  dispatch({
                    type: ActionType.SET_USER,
                    payload: JSON.parse(user),
                  });
                }
                console.log(stuff);
              }
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
    logout: async () => {
      await SecureStore.deleteItemAsync("user");
      if (dispatch) {
        dispatch({ type: ActionType.DELETE_USER });
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
          .then(async (res) => {
            if (res.data.success) {
              const user = createUser(firstName, lastName, email, password);

              if (dispatch) {
                dispatch({ type: ActionType.SET_USER, payload: user });
              }
              await SecureStore.setItemAsync("user", JSON.stringify(user));
            }
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
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await SecureStore.getItemAsync("user");
        if (user && dispatch) {
          dispatch({ type: ActionType.SET_LOADING, payload: JSON.parse(user) });
        }
      } catch (e) {
        console.error(`Restoring user error: ${e.message}`);
      }
    };
    fetchUser();
  }, [dispatch]);

  return auth;
};

export default useAuth;
