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

  // TODO: Delete/Load the "mode" object from SecureStore in the Logout/Login function
  // TODO: "user", "profilePic", are the objects in SecureStore
  const auth = React.useMemo(
    () => ({
      login: async (email: string, password: string) => {
        try {
          await axios
            .post(`${BASE_URL}/auth`, {
              username: email,
              password,
            })
            .then(async (res) => {
              if (res.data.success) {
                let user = {} as User;
                const userData = await SecureStore.getItemAsync("user");
                if (userData) {
                  user = JSON.parse(userData);
                } else {
                  const temp = res.data.result[0];

                  user = sanitizeServerUserData(temp);
                  await SecureStore.setItemAsync("user", JSON.stringify(user));
                }

                dispatch({
                  type: ActionType.SET_LOADING,
                });

                dispatch({
                  type: ActionType.SIGN_IN,
                  payload: user,
                });
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
        try {
          //const user = {} as User;
          // TODO: add the actual endpoint later to send the data to the database;
          //await axios.post(`${BASE_URL}`, user).then(async (res) => {
          //if (res.data.success) {
          await SecureStore.deleteItemAsync("user");
          dispatch({ type: ActionType.SIGN_OUT });
          //}
          //});
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
    }),
    [],
  );

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
  }, []);

  return { auth, state };
};

export default useAuth;

const sanitizeServerUserData = (temp) => {
  return {
    id: temp.id,
    ...createUser(temp.firstname, temp.lastname, temp.email, temp.password),
  };
};
