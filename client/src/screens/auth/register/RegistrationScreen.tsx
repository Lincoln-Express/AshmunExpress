import * as React from "react";
import { StyleSheet, ScrollView, View, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import * as yup from "yup";
import Logo from "../../../base/logo/Logo";
import Header from "../../../base/header/Header";
import FilledButton from "../../../base/filledButton/FilledButton";
import Icon from "../../../base/icon/Icon";
import InputField from "../../../base/inputField/InputField";
import AuthContext from "../../../contexts/AuthContext";
import { heightSize, widthSize } from "../../../themes/sizes";
import useFetch from "../../../hooks/useFetch/useFetch";
import axios from "axios";
import BASE_URL from "../../../config";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: heightSize.m * 1.81,
    padding: widthSize.s,
  },
  header: { paddingTop: heightSize.xl * 2.3 },
});

const RegistrationScreen: React.FC<null> = () => {
  const navigation = useNavigation();
  const { register } = React.useContext(AuthContext);
  const validationSchema = yup.object().shape({
    firstName: yup.string().required().label("First Name"),
    lastName: yup.string().required().label("Last Name"),
    email: yup.string().email().required().label("Your input"),
    password: yup
      .string()
      .required()
      .min(8, "Password should be 8 characters or more")
      .label("Password"),
    confirmPassword: yup
      .string()
      .required()
      .min(8, "Password should be 8 characters or more")
      .label("Confirm Password")
      .test(
        "passwords-match",
        "Passwords don't match",
        function checkPassword(this: any, value) {
          return this.parent.password === value;
        },
      ),
  });

  return (
    <ScrollView
      keyboardShouldPersistTaps={"always"}
      contentContainerStyle={styles.container}
    >
      <Logo />
      <Icon
        name="close-circle-outline"
        onPress={() => {
          navigation.goBack();
        }}
      />
      <Header style={styles.header}>Register Here</Header>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values) => {
          try {
            await axios
              .get(`${BASE_URL}/unique`, {
                params: {
                  email: values.email,
                },
              })
              .then(async (res) => {
                if (res.data.isUnique) {
                  await register(
                    values.firstName,
                    values.lastName,
                    values.email,
                    values.password,
                  );
                  navigation.goBack();
                } else {
                  Alert.alert(
                    "Sorry!",
                    "This email has been used to create an account",
                    [{ text: "Ok", onPress: () => {} }],
                    { cancelable: true },
                  );
                }
              });
          } catch (e) {}
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <>
            <InputField
              label="First Name"
              formikProps={formikProps}
              pointer="firstName"
              placeholder="John"
              autoFocus
            />
            <InputField
              label="Last Name"
              formikProps={formikProps}
              pointer="lastName"
              placeholder="Doe"
              autoFocus
            />
            <InputField
              label="Email"
              formikProps={formikProps}
              pointer="email"
              placeholder="johndoe@gmail.com"
              autoFocus
            />
            <InputField
              label="Password"
              formikProps={formikProps}
              pointer="password"
              placeholder="********"
              secureTextEntry
              autoFocus
            />

            <InputField
              label="Confirm Password"
              formikProps={formikProps}
              pointer="confirmPassword"
              placeholder="confirm password"
              secureTextEntry
              autoFocus
            />

            <FilledButton title="Register" onPress={formikProps.handleSubmit} />
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default RegistrationScreen;
