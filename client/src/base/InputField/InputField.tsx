/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { FormikProps } from "formik/dist/types";
import React from "react";
import { View, Text, TextInput } from "react-native";

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
  ...rest
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
    <View style={{ width: "100%" }}>
      <Text style={{ marginRight: 295 }}>{label}</Text>
      <TextInput
        style={inputBoxStyle}
        value={formikProps.values[pointer]}
        onChangeText={formikProps.handleChange(String(pointer))}
        onBlur={formikProps.handleBlur(String(pointer))}
        {...rest}
      />
      <Text style={{ color: "red" }}>
        {formikProps.touched[pointer] && formikProps.errors[pointer]}{" "}
      </Text>
    </View>
  );
};

InputField.defaultProps = {
  secureTextEntry: true,
};

export default InputField;
