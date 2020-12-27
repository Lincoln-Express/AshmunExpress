import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import FilledButton from "../../base/filledButton/FilledButton";
import Question from "../../base/question/Question";
import QuestionCount from "../../base/questionCount/QuestionCount";
import QuizResultScreen from "./QuizResultScreen";
import QuizHelper from "../../utils/quizHelper/QuizHelper";

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    maxWidth: "40%",
  },
});

interface ExampleScreenProps {
  questions: Array<Record<string, any>>;
  quizType: string;
}

const exampleQuizHelper = QuizHelper();
const ExampleScreen: React.FC<ExampleScreenProps> = (
  props: ExampleScreenProps,
) => {
  const navigation = useNavigation();
  const { questions, quizType } = props;

  const {
    counter,
    canGoBack,
    getQuestionObject,
    hasFinishedQuiz,
    moveToNextQuiz,
  } = exampleQuizHelper;

  const questionObject = getQuestionObject(questions);
  const { question } = questionObject;

  if (!hasFinishedQuiz(questions.length)) {
    return (
      <View>
        <QuestionCount
          counter={counter}
          totalNumberOfQuestions={questions.length}
        />
        <Question question={question} />

        <FilledButton
          title={counter < questions.length ? "Next" : "Show Results"}
          onPress={() => {
            if (!canGoBack(quizType)) {
              navigation.setOptions({
                headerLeft: null,
              });
            }
            moveToNextQuiz();
            navigation.navigate("Example");
          }}
          style={styles.button}
        />
      </View>
    );
  }
  return (
    <View>
      <QuizResultScreen quiz={quizType} />
    </View>
  );
};

export default ExampleScreen;
