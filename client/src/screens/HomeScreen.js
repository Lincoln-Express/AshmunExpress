import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function HomeScreen({ navigation }) {
	return <View style={styles.container}></View>;
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
