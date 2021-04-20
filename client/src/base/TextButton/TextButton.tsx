import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  Platform,
} from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "#273A7F",
    fontSize: 14,
  },
});

interface TextButtonProps {
  title: string;
  onPress: () => void;
}
const TextButton: React.FC<TextButtonProps> = (props: TextButtonProps) => {
  const theme = useTheme();
  const { title, onPress } = props;
  const handleOnPress = () => {
    requestAnimationFrame(() => {
      return onPress();
    });
  };

  return Platform.OS === "ios" ? (
    <TouchableOpacity style={styles.container} onPress={handleOnPress}>
      <Text style={{ ...styles.text, color: theme.colors.text }}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback style={styles.container} onPress={handleOnPress}>
      <Text style={{ ...styles.text, color: theme.colors.text }}>{title}</Text>
    </TouchableNativeFeedback>
  );
};

export default TextButton;
