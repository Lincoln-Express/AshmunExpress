import * as React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  warning: {
    color: "red",
  },
  text: {
    marginRight: 295,
  },
});
interface InputFieldProps {
  label: string;
  pointer: string;
  formikProps: any;
  placeholder: string;
  placeholderTextColor: string;
  autoFocus: boolean;
  secureTextEntry?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  formikProps,
  pointer,
  placeholder,
  placeholderTextColor,
  autoFocus,
  secureTextEntry,
}: InputFieldProps) => {
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
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={inputBoxStyle}
        value={formikProps.values[pointer]}
        onChangeText={formikProps.handleChange(String(pointer))}
        onBlur={formikProps.handleBlur(String(pointer))}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
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
  secureTextEntry: true,
};

export default InputField;
