/* eslint-disable react/jsx-indent */
import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import Loading from "../../base/loading/Loading";
import CustomList from "../../base/customList/CustomList";
import useFetch from "../../hooks/useFetch/useFetch";
import { changeObjectPropsName, mergeModeData } from "../../utils/utils";
import Icon from "../../base/icon/Icon";
import CustomCard from "../../base/customCard/CustomCard";
import ThemeContext from "../../contexts/ThemeContext";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: widthSize.s / 2,
  },
  icon: {
    right: 0,
    top: heightSize.m / 3,
  },
  title: {
    alignItems: "center",
    paddingTop: heightSize.s / 3,
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
  const left = () => (
    <Icon
      name="hourglass"
      style={styles.icon}
      color={isThemeDark ? theme.colors.primary : theme.colors.accent}
    />
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isError && <View>{isError}</View>}
      {isLoading && (
        <Loading
          loading={isLoading}
          imageSource={require("../../../assets/json-animations/waiting-for-data.json")}
        />
      )}
      {mergedModeData !== undefined
        ? mergedModeData.map((topic) => (
            <CustomList title={topic.title} key={topic.title}>
              {topic.data.map((section) => {
                const onPress = () => {
                  navigation.navigate("ModeList", {
                    topic: topic.title,
                    section,
                  });
                };

                return (
                  <CustomCard
                    key={section}
                    title={section}
                    titleStyle={styles.title}
                    elevation={5}
                    onPress={onPress}
                    left={left}
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
