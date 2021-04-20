import * as React from "react";
import { StyleSheet, View, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 330, height: 190 },
});

interface LogoProps {
  style?: Record<string, unknown>;
}
const Logo: React.FC<LogoProps> = (props: LogoProps) => {
  const { style } = props;
  return (
    <View style={{ ...styles.container, ...style }}>
      <Image
        style={styles.image}
        source={require("../../../assets/images/logo.png")}
      />
    </View>
  );
};

export default Logo;
