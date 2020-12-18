import * as React from "react";
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

const ProfileScreen: React.FC<null> = () => {
  // eslint-disable-next-line no-unused-vars
  // const navigation = useNavigation();

  // const { logout } = useContext(AuthContext);
  // const { user } = useContext(UserContext);
  //   useEffect(() => {}, []);
  return (
    <View style={styles.container}>
      <Text>Welcome, students</Text>
    </View>
  );
};

export default ProfileScreen;
