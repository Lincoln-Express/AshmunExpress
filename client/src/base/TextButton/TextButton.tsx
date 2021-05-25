import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  Platform,
} from "react-native";
import { useTheme } from "react-native-paper";
import { widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: widthSize.l / 3,
    borderRadius: widthSize.s / 3,
  },
  text: {
    color: "#273A7F",
    fontSize: widthSize.s,
  },
});

interface TextButtonProps {
  title: string;
  onPress: () => void;
}
const TextButton: React.FC<TextButtonProps> = (props: TextButtonProps) => {
  const theme = useTheme();
  const { title, onPress } = props;

  return Platform.OS === "ios" ? (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={{ ...styles.text, color: theme.colors.text }}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback style={styles.container} onPress={onPress}>
      <Text style={{ ...styles.text, color: theme.colors.text }}>{title}</Text>
    </TouchableNativeFeedback>
  );
};

export default TextButton;
