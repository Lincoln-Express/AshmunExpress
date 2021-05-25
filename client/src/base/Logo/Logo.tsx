import * as React from "react";
import { StyleSheet, View, Image } from "react-native";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    padding: heightSize.s * 1.75,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: widthSize.s * 22, height: heightSize.xl * 2.6 },
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
