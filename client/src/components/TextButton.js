import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function TextButton({ title, style, onPress }) {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Text style={styles.textStyle}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		borderRadius: 5,
	},
	textStyle: {
		color: '#273A7F',
		fontSize: 14,
	},
});
