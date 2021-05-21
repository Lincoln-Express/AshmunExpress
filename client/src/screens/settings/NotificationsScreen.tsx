import { StackActions, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import EmptyState from "../../base/emptyState/EmptyState";
import Empty from "../../../assets/svg/empty.svg";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    maxWidth: "40%",
  },
});

const NotificationsScreen: React.FC<null> = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <EmptyState
        emptyStateText={
          "The option to view notifications hasn't been created yet, check with your professor for updates."
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

export default NotificationsScreen;
