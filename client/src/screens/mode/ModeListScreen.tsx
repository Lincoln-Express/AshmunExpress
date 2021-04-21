import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import CustomCard from "../../base/customCard/CustomCard";
import IconButton from "../../base/iconButton/IconButton";
import CustomList from "../../base/customList/CustomList";
import ThemeContext from "../../contexts/ThemeContext";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 8,
  },
  icon: {
    right: 0,
    top: 5,
  },
  title: {
    alignItems: "center",
    paddingTop: 10,
    textAlign: "auto",
  },
});

const ModeListScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const modes = ["Tutorial", "Example", "Practice", "Test"];
  const levels = ["1", "2", "3", "4"];
  const route = useRoute();
  const { section, topic } = route.params;
  const { isThemeDark } = React.useContext(ThemeContext);
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {modes.map((mode) => (
        <CustomList title={mode} key={mode}>
          {levels.map((level) => {
            return (
              <CustomCard
                key={level}
                title={`Level ${level}`}
                titleStyle={styles.title}
                elevation={5}
                onPress={() => {
                  navigation.navigate("ModePenultimate", {
                    topic,
                    section,
                    level,
                    mode,
                  });
                }}
                left={() => (
                  <IconButton
                    name="hourglass"
                    style={styles.icon}
                    color={
                      isThemeDark ? theme.colors.primary : theme.colors.accent
                    }
                  />
                )}
              />
            );
          })}
        </CustomList>
      ))}
    </ScrollView>
  );
};

export default ModeListScreen;
