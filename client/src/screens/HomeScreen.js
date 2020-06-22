import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen({ navigation }) {
	useEffect(() => {
		navigation.setOptions({
			headerRight: () => <HeaderIcon />,
		});
		return () => {
			cleanup;
		};
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
