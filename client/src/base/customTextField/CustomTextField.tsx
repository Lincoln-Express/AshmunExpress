import * as React from "react";
import { View, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#767577",
    borderRadius: 3,
    padding: 5,
    alignItems: "center",
    margin: 15,
  },
});
interface CustomTextFieldProps {
  style?: Record<string, unknown>;
  placeholder: string;
  placeholderTextColor?: string;
  numberOfLines: number;
}

const CustomTextField: React.FC<CustomTextFieldProps> = (
  props: CustomTextFieldProps,
) => {
  const { style, placeholder, placeholderTextColor, numberOfLines } = props;
  return (
    <View style={styles.container}>
      <TextInput
        style={style}
        multiline
        numberOfLines={numberOfLines}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
};

export default CustomTextField;

CustomTextField.defaultProps = {
  placeholderTextColor: "#767577",
};
