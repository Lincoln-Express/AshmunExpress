import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, ScrollView, Alert } from "react-native";
import FilledButton from "../../base/filledButton/FilledButton";
import CustomProgressBar from "../../base/customProgressBar/CustomProgressBar";
import Question from "../../base/question/Question";
import QuestionCount from "../../base/questionCount/QuestionCount";
import AnswerOptions from "../../base/answerOptions/AnswerOptions";
import ModeHelper from "../../modeHelper/ModeHelper";
import { useModeState } from "../../providers/modeProvider/ModeProvider";
import { heightSize, widthSize } from "../../themes/sizes";

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

const practiceModeHelper = ModeHelper();

const PracticeScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions, mode, url } = route.params;

  const {
    canGoBack,
    isCorrect,
    getAnswers,
    getCounter,
    getQuestionObject,
    hasFinishedMode,
    moveToNextQuestion,
    resetCounter,
  } = practiceModeHelper;

  const userCanGoBack = canGoBack(mode);
  const counter = getCounter();
  const questionObject = getQuestionObject(questions);
  const { question, picture, id } = questionObject;
  const answers = getAnswers(questionObject);
  const { correctAnswersCount } = useModeState();
  const pictureTitle = picture === "yes" ? `${url}/${id}` : undefined;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (event) => {
      if (userCanGoBack) {
        return;
      }

      event.preventDefault();
      Alert.alert(
        "Sorry!",
        `You cannot go back as this is a ${mode} session`,
        [{ text: "Cancel", onPress: () => {}, style: "cancel" }],
        { cancelable: true },
      );
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
      <Question question={question} pictureTitle={pictureTitle} />
      <AnswerOptions
        answers={answers}
        questionObject={questionObject}
        isCorrect={isCorrect}
      />

      <FilledButton
        title={hasFinishedMode(questions.length) ? "Show Results" : "Next"}
        onPress={() => {
          if (!hasFinishedMode(questions.length)) {
            moveToNextQuestion();
            navigation.navigate("Practice", { questions, mode });
          } else {
            resetCounter();
            navigation.navigate("ModeResult", {
              mode,
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
