import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, ScrollView, Alert } from "react-native";
import FilledButton from "../../base/filledButton/FilledButton";
import CustomProgressBar from "../../base/customProgressBar/CustomProgressBar";
import Question from "../../base/question/Question";
import QuestionCount from "../../base/questionCount/QuestionCount";
import AnswerOptions from "../../base/answerOptions/AnswerOptions";
import QuizHelper from "../../quizHelper/QuizHelper";
import { useQuizState } from "../../providers/quizProvider/QuizProvider";

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

const practiceQuizHelper = QuizHelper();

const PracticeScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions, quiz, url } = route.params;

  const {
    canGoBack,
    isCorrect,
    getAnswers,
    getCounter,
    getQuestionObject,
    hasFinishedQuiz,
    moveToNextQuestion,
    resetCounter,
  } = practiceQuizHelper;

  const userCanGoBack = canGoBack(quiz);
  const counter = getCounter();
  const questionObject = getQuestionObject(questions);
  const { question, picture, id } = questionObject;
  const answers = getAnswers(questionObject);
  const { correctAnswersCount } = useQuizState();
  const pictureName = picture === "yes" ? `${url}${id}` : undefined;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (event) => {
      if (userCanGoBack) {
        return;
      }

      event.preventDefault();
      Alert.alert("Sorry!", `You cannot go back as this is a ${quiz} session`, [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
      ]);
    });

    return unsubscribe();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <QuestionCount
        counter={counter}
        totalNumberOfQuestions={questions.length}
        style={styles.questionCount}
      />
      <CustomProgressBar
        progress={(counter + 1) / questions.length}
        style={styles.progressBar}
      />
      <Question question={question} pictureName={pictureName} />
      <AnswerOptions
        answers={answers}
        questionObject={questionObject}
        isCorrect={isCorrect}
      />

      <FilledButton
        title={hasFinishedQuiz(questions.length) ? "Show Results" : "Next"}
        onPress={() => {
          if (!hasFinishedQuiz(questions.length)) {
            moveToNextQuestion();
            navigation.navigate("Practice", { questions, quiz });
          } else {
            resetCounter();
            navigation.navigate("QuizResult", {
              quiz,
              correctAnswersCount,
              totalQuestions: questions.length,
            });
          }
        }}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
};

export default PracticeScreen;
