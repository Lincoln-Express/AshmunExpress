import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
export default function ErrorBoundary({ error }) {
	return (
		// <View style={styles.container}>
		<Text style={styles.textStyle}>{error}</Text>
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
	},
	textStyle: {
		width: 300,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		color: '#273A7F',
	},
});
