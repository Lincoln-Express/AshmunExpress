import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, ScrollView } from "react-native";
import FilledButton from "../../base/filledButton/FilledButton";
import CustomProgressBar from "../../base/customProgressBar/CustomProgressBar";
import Question from "../../base/question/Question";
import QuestionCount from "../../base/questionCount/QuestionCount";
import QuizHelper from "../../quizHelper/QuizHelper";

const styles = StyleSheet.create({
  button: {
    maxWidth: "40%",
    marginLeft: 10,
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

const tutorialQuizHelper = QuizHelper();

const TutorialScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions, quiz, url } = route.params;

  const {
    getCounter,
    getQuestionObject,
    hasFinishedQuiz,
    moveToNextQuestion,
    resetCounter,
  } = tutorialQuizHelper;

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
        title={hasFinishedQuiz(questions.length) ? "Show Results" : "Next"}
        onPress={() => {
          if (!hasFinishedQuiz(questions.length)) {
            moveToNextQuestion();
            navigation.navigate("Tutorial", { questions, quiz });
          } else {
            resetCounter();

            navigation.navigate("QuizResult", {
              quiz,
              correctAnswersCount: 0,
              totalQuestions: questions.length,
            });
          }
        }}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
};

export default TutorialScreen;
