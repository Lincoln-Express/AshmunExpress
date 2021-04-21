/* eslint-disable react/jsx-indent */
import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import Loading from "../../base/loading/Loading";
import CustomList from "../../base/customList/CustomList";
import useFetch from "../../hooks/useFetch/useFetch";
import { changeObjectPropsName, mergeModeData } from "../../utils/utils";
import IconButton from "../../base/iconButton/IconButton";
import CustomCard from "../../base/customCard/CustomCard";
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

const ModeIntroScreen: React.FC<null> = () => {
  const navigation = useNavigation();
  const keyword = "topics";
  const { isError, isLoading, data } = useFetch(keyword);
  const mergedModeData = React.useMemo(
    () => changeObjectPropsName(mergeModeData(data)),
    [data],
  );
  const { isThemeDark } = React.useContext(ThemeContext);
  const theme = useTheme();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isError && <View>{isError}</View>}
      {isLoading && <Loading loading={isLoading} />}
      {mergedModeData !== undefined
        ? mergedModeData.map((topic) => (
            <CustomList title={topic.title} key={topic.title}>
              {topic.data.map((section) => {
                return (
                  <CustomCard
                    key={section}
                    title={section}
                    titleStyle={styles.title}
                    elevation={5}
                    onPress={() => {
                      navigation.navigate("ModeList", {
                        topic: topic.title,
                        section,
                      });
                    }}
                    left={() => (
                      <IconButton
                        name="hourglass"
                        style={styles.icon}
                        color={
                          isThemeDark
                            ? theme.colors.primary
                            : theme.colors.accent
                        }
                      />
                    )}
                  />
                );
              })}
            </CustomList>
          ))
        : null}
    </ScrollView>
  );
};

export default ModeIntroScreen;
