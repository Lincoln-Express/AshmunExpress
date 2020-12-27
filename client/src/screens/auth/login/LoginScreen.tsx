import * as React from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import Logo from "../../../base/Logo/Logo";
import FilledButton from "../../../base/FilledButton/FilledButton";
import TextButton from "../../../base/TextButton/TextButton";
import AuthContext from "../../../contexts/AuthContext";
import Loading from "../../../base/Loading/Loading";
import Header from "../../../base/Header/Header";
import InputField from "../../../base/InputField/InputField";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 250,
    padding: 16,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
});

const LoginScreen: React.FC<null> = () => {
  const navigation = useNavigation();
  const { login } = React.useContext(AuthContext);
  const [loading, setLoading] = React.useState(false);
  const validationSchema = yup.object().shape({
    email: yup.string().email().required().label("Your input"),
    password: yup
      .string()
      .required()
      .min(8, "Password should be 8 characters or more")
      .label("Password"),
  });

  return (
    <>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        enableOnAndroid
      >
        {/* <ImageBackground
          // eslint-disable-next-line global-require
          source={require("../../../../assets/background.jpg")}
          style={styles.image}
        /> */}
        <Logo />
        <Header>Welcome</Header>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            try {
              await login(values.email, values.password);
              // setLoading(true);
              navigation.navigate("MainStack");
            } catch (e) {
              setLoading(false);
            }
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <>
              <InputField
                label="Email"
                formikProps={formikProps}
                pointer="email"
                placeholder="johndoe@email.com"
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

              <FilledButton
                title="Login"
                handlePress={formikProps.handleSubmit}
              />
              <TextButton
                title={"Don't have an account? create one here"}
                handlePress={() => {
                  navigation.navigate("Registration");
                }}
              />
            </>
          )}
        </Formik>
        <Loading loading={loading} />
      </KeyboardAwareScrollView>
    </>
  );
};

export default LoginScreen;
