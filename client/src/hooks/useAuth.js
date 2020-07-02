import { useReducer, useMemo, useEffect } from 'react';
import { createAction } from '../utils/createAction';
import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';
import * as SecureStore from 'expo-secure-store';
import { BASE_URL } from '../config/index';
import Loading from '../components/Loading';

export default function useAuth() {
	const [state, dispatch] = useReducer(
		(state, action) => {
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
		},
		{
			user: undefined,
			loading: true,
		}
	);
	const auth = useMemo(
		() => ({
			login: async (email, password) => {
				const { data } = await axios.post(`${BASE_URL}/auth`, {
					username: email,
					password,
				});
				const user = {
					email: data.user.email,
					token: data.jwt,
				};
				await SecureStore.setItemAsync(user, JSON.stringify(user));
				dispatch(createAction('SET_USER', user));
			},
			logout: async () => {
				await SecureStore.deleteItemAsync(user);
				dispatch(createAction('DELETE_USER'));
			},
			register: async (firstname, lastname, email, password) => {
				// backend code should go in here
				await axios.post(`${BASE_URL}/register`, {
					username: email,
					firstname,
					lastname,
					email,
					password,
				});
			},
		}),
		[]
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
