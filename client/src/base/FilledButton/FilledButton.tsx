import * as React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Text,
  Platform,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: "#0a84ff",
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
  handlePress: () => void;
  style?: Record<string, unknown>;
  buttonStyle?: Record<string, unknown>;
}

const FilledButton: React.FC<FilledButtonProps> = (
  props: FilledButtonProps,
) => {
  const { title, handlePress, style, buttonStyle } = props;
  const titleValue = Platform.OS === "ios" ? title : title.toUpperCase();

  return Platform.OS === "ios" ? (
    <TouchableHighlight
      style={{ ...styles.container, ...style }}
      onPress={handlePress}
    >
      <Text style={{ ...styles.text, ...buttonStyle }}>{titleValue}</Text>
    </TouchableHighlight>
  ) : (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={{ ...styles.container, ...style }}>
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
