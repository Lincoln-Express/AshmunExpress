import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../../contexts/ThemeContext";
import CustomSwitch from "../../base/customSwitch/CustomSwitch";
import CustomCard from "../../base/customCard/CustomCard";
import IconButton from "../../base/iconButton/IconButton";
import useAuth from "../../hooks/useAuth/useAuth";
import CustomImagePlaceholder from "../../base/customImagePlaceholder/CustomImagePlaceholder";
import useImagePicker from "../../hooks/useImagePicker/useImagePicker";
import FilledButton from "../../base/filledButton/FilledButton";

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  themeButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 30,
  },
  pair: {
    marginVertical: 10,
  },
  card: {
    margin: 15,
  },
  customImagePlaceholder: {
    top: 10,
    left: window.width - 55,
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
  button: {
    backgroundColor: "#FF0000",
    maxWidth: "50%",
    marginLeft: 10,
  },
  cardIcon: {
    top: -15,
    right: 30,
  },
  title: {
    paddingTop: 10,
  },
});

const SettingsScreen: React.FC<null> = () => {
  const theme = useTheme();
  const { auth } = useAuth();
  const { logout } = auth;
  const navigation = useNavigation();
  const imagePicker = useImagePicker();
  const { image } = imagePicker;
  const { toggleTheme, isThemeDark } = React.useContext(ThemeContext);
  const firstPair = ["Notifications", "Account Preferences"];
  const secondPair = ["Feedback", "About us"];
  const [miniImage, setMiniImage] = React.useState(null);

  React.useEffect(() => {
    setMiniImage(image);
  }, [image]);
  const handleLogout = () => {
    Alert.alert("Warning!", "Are you sure you want to log out?", [
      { text: "Cancel", onPress: () => {}, style: "cancel" },
      {
        text: "Cancel",
        onPress: async () => {
          // post user data to the database, then logout
          await logout();
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.customImagePlaceholder}>
        <CustomImagePlaceholder imageSize={48} image={image} />
      </View>
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
              <IconButton name={"chevron-forward"} style={styles.cardIcon} />
            )}
            style={styles.card}
            titleStyle={styles.title}
          />
        );
      })}
    </View>
  );
};
