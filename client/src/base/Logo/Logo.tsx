import * as React from "react";
import { StyleSheet, View, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  image: { width: 330, height: 190 },
});

const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/images/logo.png")}
      />
    </View>
  );
};

export default Logo;
