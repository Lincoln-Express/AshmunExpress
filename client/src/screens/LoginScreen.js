import React, { useContext, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import InputField from '../components/InputField';
import FilledButton from '../components/FilledButton';
import TextButton from '../components/TextButton';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../components/Loading';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function LoginScreen({ navigation }) {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	return (
		<KeyboardAwareScrollView
			style={{ backgroundColor: '#fff' }}
			resetScrollToCoords={{ x: 0, y: 0 }}
			contentContainerStyle={styles.container}
			enableOnAndroid={true}
			extraHeight={150}
		>
			<Logo />
			<ErrorBoundary error={error} />
			<InputField
				style={styles.inputBoxStyle}
				placeholder={'Email'}
				value={email}
				onChangeText={setEmail}
			/>
			<InputField
				style={styles.inputBox}
				placeholder={'Password'}
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<FilledButton
				title={'Login'}
				style={styles.buttonStyle}
				handlePress={async () => {
					try {
						const response = await login(email, password);
						response ? setLoading(true) : setLoading(false);
					} catch (e) {
						setError(e.message);
						setLoading(false);
					}
				}}
			/>
			<TextButton
				title={"Don't have an account? create one here"}
				handlePress={() => {
					navigation.navigate('Registration');
				}}
			/>
			<Loading loading={loading} />
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 250,
		padding: 16,
		backgroundColor: '#fff',
	},
	inputBoxStyle: { marginVertical: 25 },
	buttonStyle: {
		marginVertical: 15,
	},
});
