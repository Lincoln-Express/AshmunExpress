import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StyleSheet, ScrollView, Text, Alert } from "react-native";
import FilledButton from "../../base/filledButton/FilledButton";
import CustomProgressBar from "../../base/customProgressBar/CustomProgressBar";
import Question from "../../base/question/Question";
import QuestionCount from "../../base/questionCount/QuestionCount";
import AnswerOptions from "../../base/answerOptions/AnswerOptions";
import ModeHelper from "../../modeHelper/ModeHelper";
import { useModeState } from "../../providers/modeProvider/ModeProvider";
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

const testModeHelper = ModeHelper();

const TestScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute();
  const { questions, mode, url, ...rest } = route.params;

  const {
    canGoBack,
    isCorrect,
    getAnswers,
    getCounter,
    getQuestionObject,
    hasFinishedMode,
    moveToNextQuestion,
    resetCounter,
  } = testModeHelper;

  const userCanGoBack = canGoBack(mode);
  const counter = getCounter();
  const questionObject = getQuestionObject(questions);
  const { question, picture, id } = questionObject;
  const answers = getAnswers(questionObject);
  const { correctAnswersCount } = useModeState();
  const pictureTitle = picture.length > 0 ? `${url}/${id}` : undefined;
  const onPress = () => {
    if (!hasFinishedMode(questions.length)) {
      moveToNextQuestion();
      navigation.navigate("Test", { questions, mode });
    } else {
      resetCounter();
      navigation.navigate("ModeResult", {
        mode,
        correctAnswersCount,
        totalQuestions: questions.length,
        ...rest,
      });
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (event) => {
      if (userCanGoBack) {
        return;
      }

      event.preventDefault();
      Alert.alert(
        "Sorry!",
        `You cannot go back as this is a ${mode.toLowerCase()} session`,
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
        onPress={onPress}
        buttonStyle={styles.button}
      />
    </ScrollView>
  );
};

export default TestScreen;
