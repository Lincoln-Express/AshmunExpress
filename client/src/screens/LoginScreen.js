import React from 'react';
import { StyleSheet, View } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import InputField from '../components/InputField';
import FilledButton from '../components/FilledButton';
import TextButton from '../components/TextButton';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
	const { login } = React.useContext(AuthContext);
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	return (
		<View style={styles.container}>
			<Logo />
			<Header style={styles.headerStyle}> Login</Header>
			<ErrorBoundary error={''} />
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
				onPress={() => {
					login();
				}}
			/>
			<TextButton
				title={"Don't have an account? create one here"}
				onPress={() => {
					navigation.navigate('Registration');
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 80,
		padding: 20,
		backgroundColor: '#fff',
	},
	inputBoxStyle: { marginVertical: 25 },
	headerStyle: { paddingTop: 200 },
	buttonStyle: {
		marginVertical: 15,
	},
});
