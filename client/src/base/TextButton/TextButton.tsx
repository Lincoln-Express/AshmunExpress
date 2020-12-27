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
  handlePress: () => void;
}
const TextButton: React.FC<TextButtonProps> = (props: TextButtonProps) => {
  const theme = useTheme();
  const { title, handlePress } = props;
  return Platform.OS === "ios" ? (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={{ ...styles.text, color: theme.colors.text }}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback style={styles.container} onPress={handlePress}>
      <Text style={{ ...styles.text, color: theme.colors.text }}>{title}</Text>
    </TouchableNativeFeedback>
  );
};

export default TextButton;
