import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as yup from "yup";
import Logo from "../../../base/logo/Logo";
import FilledButton from "../../../base/filledButton/FilledButton";
import TextButton from "../../../base/textButton/TextButton";
import Header from "../../../base/header/Header";
import InputField from "../../../base/inputField/InputField";
import AuthContext from "../../../contexts/AuthContext";
import Loading from "../../../base/loading/Loading";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";

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
      {loading && (
        <Loading
          loading={loading}
          imageSource={require("../../../../assets/json-animations/loading.json")}
          loadingText="Logging you in..."
        />
      )}
      {!loading && (
        <ScrollView
          keyboardShouldPersistTaps={"always"}
          contentContainerStyle={styles.container}
        >
          <Logo />
          <Header>Welcome</Header>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              try {
                setLoading(true);
                await login(values.email, values.password);
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

                <FilledButton
                  title="Login"
                  onPress={formikProps.handleSubmit}
                />
                <TextButton
                  title={"Don't have an account? create one here"}
                  onPress={() => {
                    navigation.navigate("Registration");
                  }}
                />
              </>
            )}
          </Formik>
        </ScrollView>
      )}
    </>
  );
};

export default LoginScreen;
