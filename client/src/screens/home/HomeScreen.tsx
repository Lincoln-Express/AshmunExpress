import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { useUserState } from "../../providers/userProvider/UserProvider";

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

  const user = useUserState();
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
