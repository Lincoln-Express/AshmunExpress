import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: widthSize.l / 3,
  },
});

const AboutScreen: React.FC<null> = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text, fontSize: widthSize.s }}>
        This application is designed to provide assistance to students with math
        application problems common to introductory biology, genetics,
        physiology and statistics.
      </Text>
    </View>
  );
};

export default AboutScreen;
