import * as React from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import BASE_URL from "../../config/index";
import { createUser } from "../../utils/utils";
import { ActionType, User } from "../../types/types";
import authReducer from "../../reducers/authReducer";

const useAuth = () => {
  const [state, dispatch] = React.useReducer(authReducer, {
    isSignedIn: false,
    isLoading: false,
    user: {} as User,
  });

  const auth = {
    login: async (email: string, password: string) => {
      try {
        await axios
          .post(`${BASE_URL}/auth`, {
            username: email,
            password,
          })
          .then(async (res) => {
            if (res.data.success) {
              const user = await SecureStore.getItemAsync("user");
              console.log("Dispatch works!");
              console.log("This is user" + user);

              if (user) {
                dispatch({
                  type: ActionType.SET_LOADING,
                });

                dispatch({
                  type: ActionType.SIGN_IN,
                  payload: JSON.parse(user),
                });
                console.log("isSigned In: " + state.isSignedIn);
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
      dispatch({ type: ActionType.SIGN_OUT });
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

              // dispatch({ type: ActionType.SET_USER, payload: user });

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
        if (user) {
          dispatch({ type: ActionType.SET_LOADING });
          dispatch({ type: ActionType.SIGN_IN, payload: JSON.parse(user) });
        }
      } catch (e) {
        console.error(`Restoring user error: ${e.message}`);
      }
    };
    fetchUser();
  }, [dispatch]);

  return { auth, state };
};

export default useAuth;
