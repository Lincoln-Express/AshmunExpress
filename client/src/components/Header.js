import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Header({ children, style, props }) {
	return (
		<Text {...props} style={[style, styles.text]}>
			{' '}
			{children}
		</Text>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 24,
		color: '#273A7F',
	},
});
