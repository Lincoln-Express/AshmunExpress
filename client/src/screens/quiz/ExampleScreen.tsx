import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import FilledButton from "../../base/FilledButton/FilledButton";
import Question from "../../base/Question/Question";
import QuestionCount from "../../base/QuestionCount/QuestionCount";
import QuizResultScreen from "./QuizResultScreen";
import QuizHelper from "../../utils/QuizHelper";

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

const ExampleQuizHelper = QuizHelper();
const ExampleScreen: React.FC<ExampleScreenProps> = (
  props: ExampleScreenProps,
) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions, quizType } = props;

  const {
    counter,
    canGoBack,
    getQuestionObject,
    hasFinishedQuiz,
    moveToNextQuiz,
  } = ExampleQuizHelper;

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
          handlePress={() => {
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
