import React, { useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../contexts/AuthContext";
import UserContext from "../../contexts/UserContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    padding: 16,
    backgroundColor: "#fff",
  },
});
const HomeScreen = () => {
  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text>{`Welcome, ${user}`}</Text>
    </View>
  );
};

export default HomeScreen;
