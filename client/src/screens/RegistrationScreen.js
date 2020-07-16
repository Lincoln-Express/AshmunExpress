import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import Logo from '../components/Logo';
import Header from '../components/Header';
import InputField from '../components/InputField';
import FilledButton from '../components/FilledButton';
import IconButton from '../components/IconButton';
import ErrorBoundary from '../components/ErrorBoundary';
import { AuthContext } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function RegistrationScreen({ navigation }) {
	const { register } = useContext(AuthContext);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
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
			<Header children={'Register Here'} style={styles.headerStyle} />
			<IconButton
				style={styles.iconButtonStyle}
				name={'close-circle-outline'}
				handlePress={() => {
					navigation.pop();
				}}
			/>
			<ErrorBoundary error={error} />
			<InputField
				style={styles.inputBoxStyle}
				placeholder={'First Name'}
				value={firstName}
				onChangeText={setFirstName}
			/>
			<InputField
				style={styles.inputBoxStyle}
				placeholder={'Last Name'}
				value={lastName}
				onChangeText={setLastName}
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
				handlePress={async () => {
					try {
						setLoading(true);
						await register(firstName, lastName, email, password);
						navigation.pop();
					} catch (e) {
						setError(e.message);
						setLoading(false);
					}
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
		paddingTop: 80,
		padding: 16,
		backgroundColor: '#fff',
	},
	inputBoxStyle: { marginVertical: 5 },
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
