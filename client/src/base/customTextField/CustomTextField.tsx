import * as React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: widthSize.s / 10,
    borderColor: "#767577",
    borderRadius: widthSize.l / 3,
    padding: widthSize.l / 6,
    alignItems: "center",
    margin: widthSize.s,
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
