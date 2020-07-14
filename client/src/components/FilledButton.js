import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import buttonStyle from '../utils/constants';

export default function FilledButton({ title, style, onPress }) {
	const titleValue = Platform.OS === 'ios' ? title : title.toUpperCase();
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Text style={styles.textStyle}>{titleValue}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		...Platform.select({
			ios: {
				backgroundColor: buttonStyle.ios,
			},
			android: {
				backgroundColor: buttonStyle.android.color,
				elevation: buttonStyle.android.elevation,
			},
		}),
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
