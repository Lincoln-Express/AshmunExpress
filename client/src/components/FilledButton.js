import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function FilledButton({ title, style, onPress }) {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Text style={styles.textStyle}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#273A7F',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		borderRadius: 5,
	},
	textStyle: {
		color: '#fff',
		fontSize: 16,
	},
});
