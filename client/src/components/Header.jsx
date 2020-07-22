import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    fontSize: 24,
    color: '#273A7F',
    marginBottom: 10,
  },
});
const Header = (props) => {
  const { children, style } = props;
  return <Text style={[styles.container, style]}>{children}</Text>;
};

Header.propTypes = {
  children: PropTypes.string.isRequired,
};
export default Header;
