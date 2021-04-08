import * as React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import FilledButton from "../filledButton/FilledButton";
import { useQuizDispatch } from "../../providers/quizProvider/QuizProvider";
import { useQuizSessionDispatch } from "../../providers/quizSessionProvider/QuizSessionProvider";
import AnswerButtonContext from "../../contexts/AnswerButtonContext";
import { ActionType } from "../../types/types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 3,
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

interface AnswerButtonProps {
  answer: string;
  isCorrectAnswer: boolean;
  disabled: boolean;
  questionObject: Record<string, any>;
}

const AnswerButton: React.FC<AnswerButtonProps> = (
  props: AnswerButtonProps,
) => {
  const { answer, isCorrectAnswer, disabled, questionObject } = props;
  const [borderColor, setBorderColor] = React.useState("#273A7F");
  const [isPressed, setHasBeenPressed] = React.useState(false);
  const theme = useTheme();
  const color = theme.dark ? "#F5F5F5" : "#273A7F";
  const backgroundColor = theme.dark ? "#F57C00" : "#F5F5F5";
  const { toggleDisability } = React.useContext(AnswerButtonContext);
  const trimmedAnswer = answer.replace(/(\r\n|\n|\r)/gm, "");
  const quizDispatch = useQuizDispatch()!;
  const quizSessionDispatch = useQuizSessionDispatch()!;
  const quizSessionObject = {
    id: questionObject.id,
    question: questionObject.question,
    answer: questionObject.answer,
    explanation: questionObject.explanation,
    userAnswer: trimmedAnswer,
  };

  React.useEffect(() => {
    if (isPressed) {
      quizSessionDispatch({
        type: ActionType.UPDATE_QUIZ_SESSION,
        payload: quizSessionObject,
      });

      quizDispatch({
        type: ActionType.ADD_QUIZ_SESSION,
        payload: quizSessionObject,
      });
    } else {
      return;
    }
  }, [isPressed]);

  React.useEffect(() => {
    return () => {
      toggleDisability(false);
    };
  }, []);

  const filledButtonOnPress = () => {
    if (isCorrectAnswer) {
      setBorderColor("#03FC28");
      quizDispatch({ type: ActionType.INCREMENT_SCORE });
    } else {
      setBorderColor("#FC2003");
    }
    setHasBeenPressed(!isPressed);
    toggleDisability(true);
  };

  return (
    <FilledButton
      title={trimmedAnswer}
      buttonStyle={{ ...styles.container, borderColor, backgroundColor }}
      textStyle={{ ...styles.text, color }}
      onPress={filledButtonOnPress}
      disabled={disabled}
    />
  );
};

export default AnswerButton;
