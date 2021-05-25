import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, ScrollView } from "react-native";
import FilledButton from "../../base/filledButton/FilledButton";
import CustomProgressBar from "../../base/customProgressBar/CustomProgressBar";
import Question from "../../base/question/Question";
import QuestionCount from "../../base/questionCount/QuestionCount";
import ModeHelper from "../../modeHelper/ModeHelper";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-end",
    marginRight: widthSize.l / 3,
  },
  container: {
    flexGrow: 1,
  },
  questionCount: {
    fontSize: widthSize.xl / 2,
    marginVertical: heightSize.s / 3,
    marginLeft: widthSize.l / 3,
    fontWeight: "bold",
  },
  progressBar: {
    marginLeft: widthSize.l / 3,
    marginBottom: heightSize.m * 1.13,
  },
});

const exampleModeHelper = ModeHelper();

const ExampleScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions, mode, url, ...rest } = route.params;

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
  const pictureTitle = picture === "yes" ? `${url}/${id}` : undefined;

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
      <Question question={question} pictureTitle={pictureTitle} />

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
              ...rest,
            });
          }
        }}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
};

export default ExampleScreen;
