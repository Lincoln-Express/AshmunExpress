import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import CustomCard from "../../base/customCard/CustomCard";
import Icon from "../../base/icon/Icon";
import CustomList from "../../base/customList/CustomList";
import ThemeContext from "../../contexts/ThemeContext";
import { widthSize, heightSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: widthSize.s / 2,
  },
  icon: {
    right: 0,
    top: heightSize.s / 3,
  },
  title: {
    alignItems: "center",
    paddingTop: heightSize.s / 3,
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
                  <Icon
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
