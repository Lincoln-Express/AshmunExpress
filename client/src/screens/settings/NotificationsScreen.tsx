import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
});

const NotificationsScreen: React.FC<null> = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text, fontSize: 16 }}>
        The option to view notifications hasn't been created yet, check with
        your professor for updates.
      </Text>
    </View>
  );
};

export default NotificationsScreen;
