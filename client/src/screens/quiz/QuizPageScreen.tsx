/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-fragments */
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FilledButton from "../../base/FilledButton/FilledButton";
import Loading from "../../base/Loading/Loading";
import useFetch from "../../hooks/useFetch/useFetch";
import BASE_URL from "../../config/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
const QuizPageScreen = () => {
  /* TODO: get the list of questions based on the quiztype and quiztopic and use format them here. 
  Next randomly choose  5 - 10 questions and depending on the quiz type, format each object.
    */
  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigation();
  const route = useRoute();
  const { quizType, quizTopic, level } = route.params;
  const { isError, isLoading, data } = useFetch(
    `${BASE_URL}/${quizType}/${level}/section/${quizTopic}`,
  );

  return (
    <View style={styles.container}>
      {isError && <View>{isError}</View>}
      {isLoading && <Loading loading={isLoading} />}
    </View>
  );
};

export default QuizPageScreen;
