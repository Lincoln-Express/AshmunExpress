/* eslint-disable react/jsx-fragments */
import * as React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import Logo from "../../../base/Logo/Logo";
import Header from "../../../base/Header/Header";
import FilledButton from "../../../base/FilledButton/FilledButton";
import IconButton from "../../../base/IconButton/IconButton";
import Loading from "../../../base/Loading/Loading";
import InputField from "../../../base/InputField/InputField";
import AuthContext from "../../../contexts/AuthContext";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 80,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: { paddingTop: 170 },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
});

const RegistrationScreen: React.FC<null> = () => {
  const navigation = useNavigation();
  const { register } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
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
        function checkPassword(value) {
          // eslint-disable-next-line react/no-this-in-sfc
          return this.parent.password === value;
        },
      ),
  });

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      enableOnAndroid
    >
      <ImageBackground
        // eslint-disable-next-line global-require
        source={require("../../../../assets/background.jpg")}
        style={styles.image}
      />
      <Logo />
      <IconButton
        style={styles.iconButtonStyle}
        name="close-circle-outline"
        handlePress={() => {
          navigation.pop();
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
            setLoading(true);
            await register(
              values.firstName,
              values.lastName,
              values.email,
              // eslint-disable-next-line comma-dangle
              values.password,
            );
            navigation.pop();
          } catch (e) {
            setLoading(false);
          }
        }}
        validationSchema={validationSchema}
      >
        {(formikProps) => (
          <>
            <InputField
              label="FirstName"
              formikProps={formikProps}
              pointer="firstName"
              placeholder="John"
              placeholderTextColor="#808080"
              autoFocus
            />
            <InputField
              label="LastName"
              formikProps={formikProps}
              pointer="lastName"
              placeholder="Doe"
              placeholderTextColor="#808080"
              autoFocus
            />
            <InputField
              label="Email"
              formikProps={formikProps}
              pointer="email"
              placeholder="johndoe@gmail.com"
              placeholderTextColor="#808080"
              autoFocus
            />
            <InputField
              label="Password"
              formikProps={formikProps}
              pointer="password"
              placeholder="********"
              placeholderTextColor="#808080"
              secureTextEntry
              autoFocus
            />

            <InputField
              label="Confirm Password"
              formikProps={formikProps}
              pointer="confirmPassword"
              placeholder="confirm password"
              placeholderTextColor="#808080"
              secureTextEntry
              autoFocus
            />

            <FilledButton
              title="Register"
              handlePress={formikProps.handleSubmit}
            />
          </>
        )}
      </Formik>
      <Loading loading={loading} />
    </KeyboardAwareScrollView>
  );
};

export default RegistrationScreen;
