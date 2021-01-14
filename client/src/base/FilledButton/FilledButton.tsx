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
    color: "#fff",
    fontSize: 16,
  },
});

interface FilledButtonProps {
  title: string;
  onPress: () => void;
  style?: Record<string, unknown>;
  buttonStyle?: Record<string, unknown>;
}

const FilledButton: React.FC<FilledButtonProps> = (
  props: FilledButtonProps,
) => {
  const theme = useTheme();
  const { title, onPress, style, buttonStyle } = props;
  const titleValue = Platform.OS === "ios" ? title : title.toUpperCase();

  return Platform.OS === "ios" ? (
    <TouchableHighlight
      style={{
        ...styles.container,
        backgroundColor: theme.dark ? "#F57C00" : "#0A84FF",
        ...style,
      }}
      onPress={onPress}
    >
      <Text style={{ ...styles.text, ...buttonStyle }}>{titleValue}</Text>
    </TouchableHighlight>
  ) : (
    <TouchableNativeFeedback onPress={onPress}>
      <View
        style={{
          ...styles.container,
          backgroundColor: theme.dark ? "#F57C00" : "#273A7F",
          ...style,
        }}
      >
        <Text style={{ ...styles.text, ...buttonStyle }}>{titleValue}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

FilledButton.defaultProps = {
  style: {},
  buttonStyle: {},
};
export default FilledButton;
