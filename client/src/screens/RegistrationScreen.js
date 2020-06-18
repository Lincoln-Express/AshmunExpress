import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import InputField from '../components/InputField';
import FilledButton from '../components/FilledButton';
import IconButton from '../components/IconButton';
import ErrorBoundary from '../components/ErrorBoundary';
import LoginScreen from './LoginScreen';
import { AuthContext } from '../contexts/AuthContext';
import { set } from 'react-native-reanimated';
import Loading from '../components/Loading';

export default function RegistrationScreen({ navigation }) {
	const { register } = React.useContext(AuthContext);
	const [firstname, setFirstname] = React.useState('');
	const [lastname, setLastname] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');

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
			<Header style={styles.headerStyle}> Register Here </Header>
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
						await register(firstname, lastname, email, password);
						navigation.pop();
					} catch (e) {
						setError(e.message);
						setLoading(false);
					}
				}}
			/>
			<Loading loading />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 80,
		padding: 16,
	},
	inputBoxStyle: { marginVertical: 25 },
	headerStyle: { paddingTop: 200 },
	buttonStyle: {
		marginVertical: 15,
	},
	iconButtonStyle: {
		position: 'absolute',
		top: 50,
		right: 20,
	},
});
