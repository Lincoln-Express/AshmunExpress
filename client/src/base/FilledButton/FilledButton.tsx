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

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: "#0A84FF",
      },
      android: {
        backgroundColor: "#273A7F",
        elevation: 5,
      },
    }),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  text: {
    color: "#F5F5F5",
    fontSize: 16,
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
