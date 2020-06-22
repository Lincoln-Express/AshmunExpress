import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import InputField from '../components/InputField';
import FilledButton from '../components/FilledButton';
import TextButton from '../components/TextButton';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import RegistrationScreen from './RegistrationScreen';

export default function LoginScreen({ navigation }) {
	const { login } = useContext(AuthContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	return (
		<View style={styles.container}>
			<Logo />
			<Header style={styles.headerStyle}> Login</Header>
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
				onPress={async () => {
					try {
						setLoading(true);
						await login(email, password);
					} catch (e) {
						setError(e.message);
						setLoading(false);
					}
				}}
			/>
			<TextButton
				title={"Don't have an account? create one here"}
				onPress={navigation.navigate('Registration')}
			/>
			<Loading loading={loading} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 80,
		padding: 16,
		backgroundColor: '#fff',
	},
	inputBoxStyle: { marginVertical: 25 },
	headerStyle: { paddingTop: 200 },
	buttonStyle: {
		marginVertical: 15,
	},
});
