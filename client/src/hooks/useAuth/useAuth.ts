import * as React from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import BASE_URL from "../../config/index";
import { createUser } from "../../utils/utils";
import { ActionType, User } from "../../types/types";
import authReducer from "../../reducers/authReducer";
import camelCase from "lodash/camelCase";

const mapObject = require("map-obj");
const useAuth = () => {
  const [state, dispatch] = React.useReducer(authReducer, {
    isSignedIn: false,
    isLoading: false,
    user: {} as User,
  });

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

                const temp = res.data.result[0];

                user = sanitizeServerUserData(temp);

                try {
                  const user_id = user.id;
                  await axios
                    .get(`${BASE_URL}/mode-info/${user_id}`)
                    .then(async (res) => {
                      if (res.data.success) {
                        const modes = res.data.result;

                        try {
                          const newModes = modes.map(async (mode) => {
                            const mode_id = mode.id;

                            await axios
                              .get(`${BASE_URL}/mode-session-info/${mode_id}`)
                              .then(() => {
                                if (res.data.success) {
                                  mode.modeSessionHistory = res.data.result;
                                }
                              });
                          });

                          user.modes = mapObject(
                            newModes,
                            (key, value) => [camelCase(String(key)), value],
                            { deep: true },
                          );
                        } catch (error) {}
                      }
                    });
                } catch (error) {}

                await SecureStore.setItemAsync("user", JSON.stringify(user));

                dispatch({
                  type: ActionType.SET_LOADING,
                });

                dispatch({
                  type: ActionType.SIGN_IN,
                  payload: user,
                });
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
          await SecureStore.deleteItemAsync("user");
          dispatch({ type: ActionType.SIGN_OUT });
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
  }, [dispatch]);

  return { auth, state };
};

export default useAuth;

const sanitizeServerUserData = (temp) => {
  return {
    id: temp.id,
    ...createUser(temp.firstname, temp.lastname, temp.email, temp.password),
  };
};
