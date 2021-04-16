import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
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
  const navigation = useNavigation();
  const userContext = React.useContext(UserContext);
  const { user } = userContext;

  const { firstName } = user;

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text }}>
        {`Welcome, ${firstName}`}
      </Text>
    </View>
  );
};

export default HomeScreen;
