/* eslint-disable react-native/no-inline-styles */
import * as React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Text,
  Platform,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: "#0A84FF",
      },
      android: {
        backgroundColor: "#273A7F",
        elevation: widthSize.s / 3,
      },
    }),
    width: widthSize.xl * 4,
    alignItems: "center",
    justifyContent: "center",
    padding: widthSize.xl / 2,
    marginBottom: heightSize.s / 3,
    borderRadius: widthSize.s,
    marginVertical: heightSize.s / 2,
    height: heightSize.xl,
  },
  text: {
    color: "#F5F5F5",
    fontSize: widthSize.s,
  },
});

interface FilledButtonProps {
  title: string;
  onPress: () => void;
  buttonStyle?: Record<string, unknown>;
  textStyle?: Record<string, unknown>;
  disabled?: boolean;
}

const FilledButton: React.FC<FilledButtonProps> = (
  props: FilledButtonProps,
) => {
  const theme = useTheme();
  const { title, onPress, buttonStyle, textStyle, disabled } = props;

  return Platform.OS === "ios" ? (
    <TouchableHighlight
      style={{
        ...styles.container,
        backgroundColor: theme.dark ? "#F57C00" : "#0A84FF",
        ...buttonStyle,
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
    </TouchableHighlight>
  ) : (
    <TouchableNativeFeedback onPress={onPress} disabled={disabled}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.dark ? "#F57C00" : "#273A7F",
          ...buttonStyle,
        }}
      >
        <Text style={{ ...styles.text, ...textStyle }}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

FilledButton.defaultProps = {
  buttonStyle: {},
  textStyle: {},
  disabled: false,
};
export default FilledButton;
