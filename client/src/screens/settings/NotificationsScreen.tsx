import { StackActions, useNavigation } from "@react-navigation/native";
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useTheme } from "react-native-paper";
import EmptyState from "../../base/emptyState/EmptyState";
import Empty from "../../../assets/svg/empty.svg";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const NotificationsScreen: React.FC<null> = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const onPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <EmptyState
        emptyStateText={
          "The option to view notifications hasn't been created yet, check with your professor for updates."
        }
        textStyle={{
          color: theme.colors.text,
          fontSize: widthSize.s,
          marginLeft: widthSize.l / 3,
        }}
        image={
          <Empty
            height={heightSize.s * 4}
            width={widthSize.l * 4}
            fillOpacity={0.7}
          />
        }
        buttonTitle={"Go back"}
        onPress={onPress}
      />
    </View>
  );
};

export default NotificationsScreen;
