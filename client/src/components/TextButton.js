import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	Platform,
} from 'react-native';

export default function TextButton({ title, style, handlePress }) {
	return Platform.OS === 'ios' ? (
		<TouchableOpacity
			style={[styles.container, style]}
			onPress={handlePress}
		>
			<Text style={styles.textStyle}>{title}</Text>
		</TouchableOpacity>
	) : (
		<TouchableNativeFeedback
			style={[styles.container, style]}
			onPress={handlePress}
		>
			<Text style={styles.textStyle}>{title}</Text>
		</TouchableNativeFeedback>
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
