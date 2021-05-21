import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import EmptyState from "../../base/emptyState/EmptyState";
import UserContext from "../../contexts/UserContext";
import Empty from "../../../assets/svg/empty.svg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    maxWidth: "40%",
  },
});

const AccountScreen: React.FC<null> = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = React.useContext(UserContext);
  const { firstName, lastName, email, password } = user;
  const data = [firstName, lastName, email, password];

  return (
    <View style={styles.container}>
      <EmptyState
        emptyStateText={
          "The option to view your account and change profile details hasn't been created yet, check with your professor for updates."
        }
        textStyle={{ color: theme.colors.text, fontSize: 16, marginLeft: 10 }}
        image={<Empty height={120} width={120} fillOpacity={0.7} />}
        buttonTitle={"Go back"}
        onPress={() => {
          navigation.goBack();
        }}
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default AccountScreen;
