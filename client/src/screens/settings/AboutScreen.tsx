import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
});

const AboutScreen: React.FC<null> = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text, fontSize: 16 }}>
        This application is designed to provide assistance to students with math
        application problems common to introductory biology, genetics,
        physiology and statistics.
      </Text>
    </View>
  );
};

export default AboutScreen;
