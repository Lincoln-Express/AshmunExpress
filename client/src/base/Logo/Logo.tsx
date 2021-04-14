/* eslint-disable global-require */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { StyleSheet, View, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
});

const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 330, height: 190 }}
        source={require("../../../assets/lincolnLogo.png")}
      />
    </View>
  );
};

export default Logo;
