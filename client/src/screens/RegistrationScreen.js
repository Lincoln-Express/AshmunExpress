import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import InputField from '../components/InputField';
import FilledButton from '../components/FilledButton';
import IconButton from '../components/IconButton';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../components/Loading';

export default function RegistrationScreen({ navigation }) {
	const { register } = useContext(AuthContext);
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	return (
		<View style={styles.container}>
			<Logo />
			<IconButton
				style={styles.iconButtonStyle}
				// platform conditional
				name={'md-close-circle-outline'}
				onPress={() => {
					navigation.pop();
				}}
			/>
			<ErrorBoundary error={error} />
			<InputField
				style={styles.inputBoxStyle}
				placeholder={'First name'}
				value={firstname}
				onChangeText={setFirstname}
			/>
			<InputField
				style={styles.inputBoxStyle}
				placeholder={'Last name'}
				value={lastname}
				onChangeText={setLastname}
			/>
			<InputField
				style={styles.inputBoxStyle}
				placeholder={'Email'}
				keyboardType={'email-address'}
				value={email}
				onChangeText={setEmail}
			/>
			<InputField
				style={styles.inputBoxStyle}
				placeholder={'Password'}
				secureTextEntry
				value={password}
				onChangeText={setPassword}
			/>
			<FilledButton
				title={'Register'}
				style={styles.buttonStyle}
				onPress={async () => {
					try {
						setLoading(true);
						await register(firstname, lastname, email, password);
						navigation.pop();
					} catch (e) {
						setError(e.message);
						setLoading(false);
					}
				}}
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
	inputBoxStyle: { marginVertical: 10 },
	headerStyle: { paddingTop: 170 },
	buttonStyle: {
		marginVertical: 15,
	},
	iconButtonStyle: {
		position: 'absolute',
		top: 50,
		right: 20,
	},
});
