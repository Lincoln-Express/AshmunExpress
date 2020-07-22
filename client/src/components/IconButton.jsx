import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {},
});

const IconButton = (props) => {
  const { name, handlePress, style } = props;
  const nameValue = Platform.OS === 'ios' ? `ios-${name}` : `md-${name}`;

  return Platform.OS === 'ios' ? (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
      <Ionicons name={nameValue} size={32} color='#273A7F' />
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={[styles.container, style]}>
        <Ionicons name={nameValue} size={32} color='#273A7F' />
      </View>
    </TouchableNativeFeedback>
  );
};

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
};
export default IconButton;
