import React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
	View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ name, style, handlePress }) {
	const nameValue = Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`;

	return Platform.OS === 'ios' ? (
		<TouchableOpacity
			style={[styles.container, style]}
			onPress={handlePress}
		>
			<Ionicons name={nameValue} size={32} color={'#273A7F'} />
		</TouchableOpacity>
	) : (
		<TouchableNativeFeedback onPress={handlePress}>
			<View style={[styles.container, style]}>
				<Ionicons name={nameValue} size={32} color={'#273A7F'} />
			</View>
		</TouchableNativeFeedback>
	);
}

const styles = StyleSheet.create({
	container: {},
});
