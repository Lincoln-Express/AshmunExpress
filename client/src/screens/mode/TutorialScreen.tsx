import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, ScrollView } from "react-native";
import FilledButton from "../../base/filledButton/FilledButton";
import CustomProgressBar from "../../base/customProgressBar/CustomProgressBar";
import Question from "../../base/question/Question";
import QuestionCount from "../../base/questionCount/QuestionCount";
import ModeHelper from "../../modeHelper/ModeHelper";
import { widthSize, heightSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  button: {
    marginLeft: widthSize.l / 3,
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
    marginLeft: widthSize.l,
    marginBottom: widthSize.m * 1.13,
  },
});

const tutorialModeHelper = ModeHelper();

const TutorialScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions, mode, url } = route.params;

  const {
    getCounter,
    getQuestionObject,
    hasFinishedMode,
    moveToNextQuestion,
    resetCounter,
  } = tutorialModeHelper;

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
        title={hasFinishedMode(questions.length) ? "Done" : "Next"}
        onPress={() => {
          if (!hasFinishedMode(questions.length)) {
            moveToNextQuestion();
            navigation.navigate("Tutorial", { questions, mode });
          } else {
            resetCounter();

            navigation.navigate("ModeResult", {
              mode,
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
