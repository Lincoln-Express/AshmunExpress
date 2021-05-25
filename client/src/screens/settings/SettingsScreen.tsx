import * as React from "react";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../../contexts/ThemeContext";
import CustomSwitch from "../../base/customSwitch/CustomSwitch";
import CustomCard from "../../base/customCard/CustomCard";
import Icon from "../../base/icon/Icon";
import useImagePicker from "../../hooks/useImagePicker/useImagePicker";
import FilledButton from "../../base/filledButton/FilledButton";
import AuthContext from "../../contexts/AuthContext";
import { heightSize, widthSize } from "../../themes/sizes";
import UserContext from "../../contexts/UserContext";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  themeButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: widthSize.s,
    marginTop: heightSize.s,
  },
  pair: {
    marginVertical: heightSize.s / 3,
  },
  card: {
    margin: widthSize.s,
  },
  button: {
    backgroundColor: "#CC0000",
    maxWidth: "50%",
    marginLeft: widthSize.l / 3,
  },
  cardIcon: {
    top: -(heightSize.s / 2),
    right: widthSize.l,
  },
  title: {
    paddingTop: heightSize.s / 3,
  },
});

const SettingsScreen: React.FC<null> = () => {
  const theme = useTheme();
  const { logout } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const imagePicker = useImagePicker();
  const { image } = imagePicker;
  const { user } = React.useContext(UserContext);
  const { toggleTheme, isThemeDark } = React.useContext(ThemeContext);
  const firstPair = ["Notifications", "Account Preferences"];
  const secondPair = ["Feedback", "About us"];
  const [miniImage, setMiniImage] = React.useState(null);

  React.useEffect(() => {
    setMiniImage(image.uri);
  }, [image]);
  const handleLogout = () => {
    Alert.alert(
      "Warning!",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            await logout();
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.themeButton}>
        <Text style={{ color: theme.colors.text, fontSize: 24 }}>
          Dark Mode
        </Text>
        <CustomSwitch
          onPress={toggleTheme}
          value={isThemeDark}
          trackColor={["#767577", theme.colors.primary]}
        />
      </View>
      {renderSettings(firstPair, navigation)}
      {renderSettings(secondPair, navigation)}
      <FilledButton
        title={"Log out"}
        onPress={handleLogout}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
};

export default SettingsScreen;

const renderSettings = (arr: string[], navigation: any) => {
  return (
    <View style={styles.pair}>
      {arr.map((value) => {
        const screenName = value.split(" ")[0];
        return (
          <CustomCard
            key={value}
            title={value}
            elevation={5}
            onPress={() => navigation.navigate(screenName)}
            right={() => (
              <Icon name={"chevron-forward"} style={styles.cardIcon} />
            )}
            style={styles.card}
            titleStyle={styles.title}
          />
        );
      })}
    </View>
  );
};
