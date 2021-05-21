import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, ScrollView } from "react-native";
import FilledButton from "../../base/filledButton/FilledButton";
import CustomProgressBar from "../../base/customProgressBar/CustomProgressBar";
import Question from "../../base/question/Question";
import QuestionCount from "../../base/questionCount/QuestionCount";
import ModeHelper from "../../modeHelper/ModeHelper";

const styles = StyleSheet.create({
  button: {
    maxWidth: "40%",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  container: {
    flexGrow: 1,
  },
  questionCount: {
    fontSize: 20,
    marginVertical: 10,
    marginLeft: 10,
    fontWeight: "bold",
  },
  progressBar: {
    marginLeft: 10,
    marginBottom: 50,
  },
});

const exampleModeHelper = ModeHelper();

const ExampleScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions, mode, url, level, section, topic } = route.params;

  const {
    getCounter,
    getQuestionObject,
    hasFinishedMode,
    moveToNextQuestion,
    resetCounter,
  } = exampleModeHelper;

  const counter = getCounter();
  const questionObject = getQuestionObject(questions);
  const { question, picture, id } = questionObject;
  const pictureName = picture === "yes" ? `${url}${id}` : undefined;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <QuestionCount
        counter={counter}
        totalNumberOfQuestions={questions.length}
        style={styles.questionCount}
      />
      <CustomProgressBar
        progress={counter + 1 / questions.length}
        style={styles.progressBar}
      />
      <Question question={question} pictureName={pictureName} />

      <FilledButton
        title={hasFinishedMode(questions.length) ? "Show Results" : "Next"}
        onPress={() => {
          if (!hasFinishedMode(questions.length)) {
            moveToNextQuestion();
            navigation.navigate("Example", { questions, mode });
          } else {
            resetCounter();
            navigation.navigate("ModeResult", {
              mode,
              correctAnswersCount: 0,
              totalQuestions: questions.length,
              ...route.params,
            });
          }
        }}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
};

export default ExampleScreen;
