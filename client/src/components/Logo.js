import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function Logo() {
	return (
		<View style={styles.container}>
			<Image
				style={{ width: 328, height: 188 }}
				source={require('../../assets/LULogo.png')}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: 50,
		justifyContent: 'center',
		alignSelf: 'center',
	},
});
