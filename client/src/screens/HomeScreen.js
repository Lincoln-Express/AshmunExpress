import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AuthContext } from '../contexts/AuthContext';
import { UserContext } from '../contexts/UserContext';
export default function HomeScreen({ navigation }) {
	const { logout } = useContext(AuthContext);
	const { user } = useContext(UserContext);
	useEffect(() => {}, []);
	return (
		<View style={styles.container}>
			<Text>Welcome, students</Text>
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
});
