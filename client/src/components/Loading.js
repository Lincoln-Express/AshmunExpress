import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

export default function Loading({ loading }) {
	if (!loading) {
		return <View />;
	}
	return (
		<View>
			<View>
				<ActivityIndicator />
				<Text> Loading... </Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});
