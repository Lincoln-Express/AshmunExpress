import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import FilledButton from "../../base/filledButton/FilledButton";
import CustomProgressBar from "../../base/customProgressBar/CustomProgressBar";
import Question from "../../base/question/Question";
import QuestionCount from "../../base/questionCount/QuestionCount";
import QuizResultScreen from "./QuizResultScreen";
import QuizHelper from "../../utils/quizHelper/QuizHelper";

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

const TutorialScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions, quiz } = route.params;
  const tutorialQuizHelper = QuizHelper();

  const {
    getCounter,
    getQuestionObject,
    hasFinishedQuiz,
    moveToNextQuiz,
  } = tutorialQuizHelper;

  if (!hasFinishedQuiz(questions.length)) {
    const counter = getCounter();
    const questionObject = getQuestionObject(questions);
    const { question } = questionObject;

    return (
      <View style={styles.container}>
        <QuestionCount
          counter={counter}
          totalNumberOfQuestions={questions.length}
          style={styles.questionCount}
        />
        <CustomProgressBar
          progress={counter + 1 / questions.length}
          style={styles.progressBar}
        />
        <Question question={question} />

        <FilledButton
          title={counter < questions.length ? "Next" : "Show Results"}
          onPress={() => {
            moveToNextQuiz();
            navigation.navigate("Tutorial", { questions, quiz });
          }}
          style={styles.button}
        />
      </View>
    );
  }
  return (
    <View>
      <QuizResultScreen quiz={quiz} />
    </View>
  );
};

export default TutorialScreen;
