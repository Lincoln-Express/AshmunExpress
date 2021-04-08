import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAuthState } from "../../providers/authProvider/AuthProvider";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    padding: 16,
  },
});

const ProfileScreen: React.FC<null> = () => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text }}>Welcome, students</Text>
    </View>
  );
};

export default ProfileScreen;
