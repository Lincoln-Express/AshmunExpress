import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import ThemeContext from "../../contexts/ThemeContext";
import CustomSwitch from "../../base/customSwitch/CustomSwitch";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    padding: 16,
  },
});
const SettingsScreen = () => {
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text }}>Welcome, students</Text>
      <CustomSwitch
        onPress={toggleTheme}
        value={isThemeDark}
        trackColor={["#767577", theme.colors.primary]}
      />
    </View>
  );
};

export default SettingsScreen;
