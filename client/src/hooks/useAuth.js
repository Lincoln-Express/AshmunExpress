import { useReducer, useEffect, useMemo } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import BASE_URL from '../config/index';
import createAction from '../utils/createAction';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: { ...action.payload },
      };
    case 'DELETE_USER':
      return {
        ...state,
        user: undefined,
      };
    case 'SET_LOADING':
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
        try {
          await axios
            .post(`${BASE_URL}auth`, {
              username: email,
              password,
            })
            .then((res) => {
              const user = res.data.email;
              dispatch(createAction('SET_USER', user));
              SecureStore.setItemAsync(user, JSON.stringify(user));
            });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(`Login request failed: ${error} `);
        }
      },
      logout: () => {
        // eslint-disable-next-line no-undef
        SecureStore.deleteItemAsync(user);
        dispatch(createAction('DELETE_USER'));
      },
      register: async (firstName, lastName, email, password) => {
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
          console.error(`Register request failed: ${error}`);
        }
      },
    }), // eslint-disable-next-line comma-dangle
    [dispatch]
  );
  useEffect(() => {
    SecureStore.getItemAsync('user').then((user) => {
      if (user) {
        dispatch(createAction('SET_USER', JSON.parse(user)));
      }
      dispatch(createAction('SET_LOADING', false));
    });
  }, []);
  return { auth, state };
}
