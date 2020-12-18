import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../base/Loading/Loading";
import CustomList from "../../base/CustomList/CustomList";
import useFetch from "../../hooks/useFetch/useFetch";
import mergeQuizData from "../../utils/mergeQuizData/mergeQuizData";
import transformData from "../../utils/transformData/transformData";
import IconButton from "../../base/IconButton/IconButton";
import CustomCard from "../../base/CustomCard/CustomCard";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 8,
    backgroundColor: "#fff",
  },
  icon: {
    right: 0,
    top: 3,
    left: 5,
  },
  title: {
    flexGrow: 1,
    alignItems: "center",
  },
});

const QuizBasicScreen: React.FC<null> = () => {
  const navigation = useNavigation();
  const keyword = "topics";
  const { isError, isLoading, data } = useFetch(keyword);
  const mergedQuizData = transformData(mergeQuizData(data));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isError && <View>{isError}</View>}
      {isLoading && <Loading loading={isLoading} />}
      {mergedQuizData !== undefined
        ? mergedQuizData.map((topic) => (
            <CustomList title={topic.title} key={topic.title}>
              {topic.data.map((section) => {
                return (
                  <CustomCard
                    key={section}
                    title={section}
                    titleStyle={styles.title}
                    elevation={5}
                    onPress={() => {
                      navigation.navigate("QuizList", {
                        name: topic.title,
                        section,
                      });
                    }}
                    left={() => (
                      <IconButton name="hourglass" style={styles.icon} />
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

export default QuizBasicScreen;
