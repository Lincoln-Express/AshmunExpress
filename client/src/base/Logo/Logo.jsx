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

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 330, height: 190 }}
        source={require("../../../assets/LULogo.png")}
      />
    </View>
  );
};

export default Logo;
