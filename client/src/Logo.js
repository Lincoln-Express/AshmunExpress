import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Logo() {
	return (
		<View style={styles.container}>
			<Image
				style={{ width: 328, height: 188 }}
				source={require('../assets/LULogo.png')}
			/>
			<Text style={styles.textStyle}>Welcome to Ashmun Express</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	textStyle: {
		marginVertical: 15,
		color: '#273A7F',
		fontSize: 24,
	},
});
