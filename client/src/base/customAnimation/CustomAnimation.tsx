import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import FadeInOut from "react-native-fade-in-out/dist/src";
import LottieView from "lottie-react-native";
import { useTheme } from "react-native-paper/src/core/theming";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginLeft: widthSize.l / 3,
    fontSize: widthSize.xl / 2,
    fontWeight: "100",
    marginVertical: heightSize.s / 3,
  },

  lottie: {
    width: widthSize.xl * 3,
    height: heightSize.s * 4,
    alignSelf: "center",
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
        <LottieView source={imageSource} autoPlay loop style={styles.lottie} />
        <Text style={{ ...styles.text, color: theme.colors.text }}>{text}</Text>
      </FadeInOut>
    </View>
  );
};

export default CustomAnimation;
