import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import EmptyState from "../../base/emptyState/EmptyState";
import UserContext from "../../contexts/UserContext";
import Empty from "../../../assets/svg/empty.svg";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const AccountScreen: React.FC<null> = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = React.useContext(UserContext);
  const { firstName, lastName, email, password } = user;
  const data = [firstName, lastName, email, password];
  const onPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <EmptyState
        emptyStateText={
          "The option to view your account and change profile details hasn't been created yet, check with your professor for updates."
        }
        textStyle={{
          color: theme.colors.text,
          fontSize: widthSize.s,
          marginLeft: widthSize.l / 3,
        }}
        image={
          <Empty
            height={heightSize.s * 4}
            width={widthSize.xl * 3}
            fillOpacity={0.7}
          />
        }
        buttonTitle={"Go back"}
        onPress={onPress}
      />
    </View>
  );
};

export default AccountScreen;
