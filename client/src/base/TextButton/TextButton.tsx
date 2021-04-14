import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  Platform,
} from "react-native";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 5,
  },
  textStyle: {
    color: "#273A7F",
    fontSize: 14,
  },
});

interface TextButtonProps {
  title: string;
  handlePress: () => void;
}
const TextButton: React.FC<TextButtonProps> = (props: TextButtonProps) => {
  const { title, handlePress } = props;
  return Platform.OS === "ios" ? (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback style={styles.container} onPress={handlePress}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableNativeFeedback>
  );
};

TextButton.propTypes = {
  title: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
};

export default TextButton;
