import React from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Text,
  Platform,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import buttonStyle from '../utils/utils';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: buttonStyle.ios,
      },
      android: {
        backgroundColor: buttonStyle.android.color,
        elevation: buttonStyle.android.elevation,
      },
    }),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
  },
});

const FilledButton = (props) => {
  const { title, handlePress } = props;
  const titleValue = Platform.OS === 'ios' ? title : title.toUpperCase();

  return Platform.OS === 'ios' ? (
    <TouchableHighlight style={styles.container} onPress={handlePress}>
      <Text style={styles.textStyle}>{titleValue}</Text>
    </TouchableHighlight>
  ) : (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>{titleValue}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

FilledButton.propTypes = {
  title: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
};

export default FilledButton;
