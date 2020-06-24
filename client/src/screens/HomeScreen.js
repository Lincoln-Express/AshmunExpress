import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderIcon from '../components/HeaderIcon';
import { AuthContext } from '../contexts/AuthContext';
export default function HomeScreen({ navigation }) {
	const {
		auth: { logout },
	} = useContext(AuthContext);
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<HeaderIcon
					name={'log-out-outline'}
					onPress={() => {
						logout();
					}}
				/>
			),
		});
	}, [navigation]);
	return <View style={styles.container}> Welcome, students</View>;
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
