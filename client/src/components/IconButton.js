import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ name, style, onPress }) {
	const nameValue = Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`;
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Ionicons name={nameValue} size={32} color={'#273A7F'} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {},
});
