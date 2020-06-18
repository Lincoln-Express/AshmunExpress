import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function IconButton({ name, style, onPress }) {
	return (
		<TouchableOpacity style={[styles.container, style]} onPress={onPress}>
			<Ionicons name={name} size={32} color={'#273A7F'} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {},
});
