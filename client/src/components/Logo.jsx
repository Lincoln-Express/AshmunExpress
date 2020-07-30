import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    padding: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const Logo = () => (
  <View style={styles.container}>
    <Image
      style={{ width: 328, height: 188 }}
      // eslint-disable-next-line global-require
      source={require('../../assets/LULogo.png')}
    />
  </View>
);

export default Logo;
