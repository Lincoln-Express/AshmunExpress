import React from 'react';

import { StyleSheet, TextInput, Platform, View } from 'react-native';

export default function InputField({ style, ...props }) {
	return <TextInput {...props} style={[styles.inputBox, style]} />;
}

const styles = StyleSheet.create({
	inputBox: {
		backgroundColor: '#e8e8e8',
		width: '100%',
		color: '#273A7F',
		padding: 20,
		borderRadius: 5,
	},
});
