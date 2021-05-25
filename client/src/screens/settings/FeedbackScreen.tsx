import * as React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import CustomTextField from "../../base/customTextField/CustomTextField";
import FilledButton from "../../base/filledButton/FilledButton";
import Logo from "../../base/logo/Logo";
import { widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  logo: {
    position: "relative",
    padding: widthSize.m,
  },
  button: {
    marginLeft: widthSize.s,
  },
});

const FeedbackScreen: React.FC<null> = () => {
  const theme = useTheme();
  const [text, setText] = React.useState("");

  const onPress = () => {
    // send text using post request
    // open a modal saying feedback submission is successful
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo style={styles.logo} />
      <Text style={{ color: theme.colors.text, marginLeft: widthSize.s }}>
        Have a question or an issue, let us know!
      </Text>
      <CustomTextField placeholder={"Type something here"} numberOfLines={10} />
      <FilledButton
        title={"Submit"}
        onPress={onPress}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
};

export default FeedbackScreen;
