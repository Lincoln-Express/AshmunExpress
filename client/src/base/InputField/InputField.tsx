import * as React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { heightSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  warning: {
    color: "red",
  },
  label: {
    marginTop: heightSize.s / 3,
  },
});
interface InputFieldProps {
  label: string;
  pointer: string;
  formikProps: any;
  placeholder: string;
  autoFocus: boolean;
  secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  formikProps,
  pointer,
  placeholder,
  autoFocus,
  secureTextEntry,
}: InputFieldProps) => {
  const theme = useTheme();
  const inputBoxStyle = {
    borderColor: "#273A7F",
    borderWidth: 1,
    color: "#273A7F",
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
  };

  if (formikProps.touched[pointer] && formikProps.errors[pointer]) {
    inputBoxStyle.borderColor = "#FF0000";
  }
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.label, color: theme.colors.text }}>{label}</Text>
      <TextInput
        style={inputBoxStyle}
        value={formikProps.values[pointer]}
        onChangeText={formikProps.handleChange(String(pointer))}
        onBlur={formikProps.handleBlur(String(pointer))}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.placeholder}
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
      />
      <Text style={styles.warning}>
        {formikProps.touched[pointer] && formikProps.errors[pointer]}
      </Text>
    </View>
  );
};

InputField.defaultProps = {
  secureTextEntry: false,
};

export default InputField;
