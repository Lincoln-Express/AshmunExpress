import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import CustomCard from "../../base/customCard/CustomCard";
import UserContext from "../../contexts/UserContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

const AccountScreen: React.FC<null> = () => {
  const theme = useTheme();
  const { user } = React.useContext(UserContext);
  const { firstName, lastName, email, password } = user;
  const data = [firstName, lastName, email, password];

  return (
    <View style={styles.container}>
      <View></View>
    </View>
  );
};

export default AccountScreen;
