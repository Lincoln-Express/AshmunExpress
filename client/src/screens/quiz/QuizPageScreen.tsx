import * as React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import shuffle from "lodash/shuffle";
import BASE_URL from "../../config";
import useFetch from "../../hooks/useFetch/useFetch";
import Loading from "../../base/Loading/Loading";
import ExampleScreen from "./ExampleScreen";
import PracticeScreen from "./PracticeScreen";
import TestScreen from "./TestScreen";
import TutorialScreen from "./TutorialScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 36,
  },
});
const QuizPageScreen: React.FC<null> = (): JSX.Element => {
  const route = useRoute();
  const { section, quiz, level } = route.params;

  const { isError, isLoading, data } = useFetch(
    `${quiz.toLowerCase()}/${level}/section/${section}`,
  );

  if (data !== undefined) {
    const shuffledArray: Array<Record<string, any>> = shuffle(data);
    const len = shuffledArray.length;
    const endIndex = getEndIndex(len);
    const questions = shuffledArray.slice(0, endIndex);
    const QuizType = getQuizScreen(quiz, questions);
    return <ScrollView>{QuizType}</ScrollView>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && <Loading loading={isLoading} />}
      {isError && <Text style={styles.text}>Failed to Load!</Text>}
    </ScrollView>
  );
};

function getEndIndex(len: number) {
  if (len < 11) {
    return len + 1;
  }

  if (len > 20) {
    return 11;
  }

  return len / 2 + 1;
}

function getQuizScreen(quiz: string, questions: Array<Record<string, any>>) {
  if (quiz === "Example") {
    return <ExampleScreen questions={questions} quizType={quiz} />;
  }
  if (quiz === "Practice") {
    return <PracticeScreen />;
  }

  if (quiz === "Tutorial") {
    return <TutorialScreen />;
  }
  return <TestScreen />;
}

export default QuizPageScreen;
