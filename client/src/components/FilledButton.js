import React from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	Platform,
	View,
} from 'react-native';
import buttonStyle from '../utils/constants';

export default function FilledButton({ title, style, handlePress }) {
	const titleValue = Platform.OS === 'ios' ? title : title.toUpperCase();

	return Platform.OS === 'ios' ? (
		<TouchableHighlight
			style={[styles.container, style]}
			onPress={handlePress}
		>
			<Text style={styles.textStyle}>{titleValue}</Text>
		</TouchableHighlight>
	) : (
		<TouchableNativeFeedback onPress={handlePress}>
			<View style={[styles.container, style]}>
				<Text style={styles.textStyle}>{titleValue}</Text>
			</View>
		</TouchableNativeFeedback>
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
