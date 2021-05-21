import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import FadeInOut from "react-native-fade-in-out/dist/src";
import LottieView from "lottie-react-native";
import { useTheme } from "react-native-paper/src/core/theming";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "100",
    marginVertical: 10,
  },
});

interface CustomAnimationProps {
  text?: string;
  style?: Record<string, unknown>;
  imageSource: any;
}
const CustomAnimation: React.FC<CustomAnimationProps> = (
  props: CustomAnimationProps,
) => {
  const { imageSource, text, style } = props;
  const theme = useTheme();

  return (
    <View style={{ ...styles.container, ...style }}>
      <FadeInOut visible={true}>
        <LottieView
          source={imageSource}
          autoPlay
          loop
          style={{ width: 120, height: 120, alignSelf: "center" }}
        />
        <Text style={{ ...styles.text, color: theme.colors.text }}>{text}</Text>
      </FadeInOut>
    </View>
  );
};

export default CustomAnimation;
