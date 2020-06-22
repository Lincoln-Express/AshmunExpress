import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//check out zillow's impl of errorboundary
export default function ErrorBoundary({ error }) {
	return (
		// <View style={styles.container}>
		<Text style={styles.textStyle}>{error}</Text>
		// </View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
	},
	textStyle: {
		width: 300,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		color: '#273A7F',
	},
});

// import React, { Component } from 'react';
// import { Link, Redirect } from '@reach/router';

// class ErrorBoundary extends Component {
// 	constructor(props) {
// 		super(props);

// 		this.state = { hasError: false, redirect: false };
// 	}

// 	static getDerivedStateFromError() {
// 		return {
// 			hasError: true,
// 		};
// 	}

// 	componentDidCatch(error, info) {
// 		console.error('ErrorBoundary caught an error', error, info);
// 	}

// 	componentDidUpdate() {
// 		if (this.state.hasError) {
// 			setTimeout(() => this.setState({ redirect: true }), 5000);
// 		}
// 	}
// 	render() {
// 		if (this.state.hasError) {
// 			return <Redirect to='/' />;
// 		}
// 		if (this.state.hasError) {
// 			return (
// 				<h1>
// 					There was an error with this listing.{' '}
// 					<Link to='/'> Click here</Link> to go back to the home page
// 				</h1>
// 			);
// 		}

// 		return this.props.children;
// 	}
// }

// export default ErrorBoundary;
