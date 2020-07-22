import React from 'react';
// eslint-disable-next-line object-curly-newline
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 20,
    borderRadius: 5,
  },
  textStyle: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '400',
    color: '#273A7F',
  },
});

const Loading = (props) => {
  const { loading } = props;
  if (!loading) {
    return <View />;
  }
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator color='#273A7F' />
        <Text style={styles.textStyle}> Loading... </Text>
      </View>
    </View>
  );
};

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};
export default Loading;
