import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import AuthContext from "../../contexts/AuthContext";
import UserContext from "../../contexts/UserContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    padding: 16,
  },
});
const HomeScreen: React.FC<null> = () => {
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigation();
  const { user } = React.useContext(UserContext);
  // here we use scoreContext to show the user's score and display some type of message
  // user is in this format: `${firstName}-${lastName}-${email}`;
  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text }}>{`Welcome, ${user}`}</Text>
    </View>
  );
};

export default HomeScreen;
