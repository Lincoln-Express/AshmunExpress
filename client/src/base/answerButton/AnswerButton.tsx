import * as React from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import FilledButton from "../filledButton/FilledButton";
import { useModeDispatch } from "../../providers/modeProvider/ModeProvider";
import { useModeSessionDispatch } from "../../providers/modeSessionProvider/ModeSessionProvider";
import AnswerButtonContext from "../../contexts/AnswerButtonContext";
import { ActionType } from "../../types/types";
import { widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    borderRadius: widthSize.l / 3,
    borderWidth: widthSize.s / 5,
    padding: widthSize.l / 3,
    backgroundColor: "#F5F5F5",
  },
  text: {
    fontSize: widthSize.xl / 2,
    fontWeight: "bold",
  },
});

interface AnswerButtonProps {
  answer: string;
  isCorrectAnswer: boolean;
  disabled: boolean;
  questionObject: Record<string, unknown>;
}

const AnswerButton: React.FC<AnswerButtonProps> = (
  props: AnswerButtonProps,
) => {
  const { answer, isCorrectAnswer, disabled, questionObject } = props;
  const [borderColor, setBorderColor] = React.useState("#273A7F");
  const [isPressed, setIsPressed] = React.useState(false);
  const theme = useTheme();
  const color = theme.dark ? "#F5F5F5" : "#273A7F";
  const backgroundColor = theme.dark ? "#F57C00" : "#F5F5F5";
  const { toggleDisability } = React.useContext(AnswerButtonContext);
  const trimmedAnswer = answer.replace(/(\r\n|\n|\r)/gm, "");
  const modeDispatch = useModeDispatch()!;
  const modeSessionDispatch = useModeSessionDispatch()!;
  const modeSessionObject = {
    question: questionObject.question,
    answer: questionObject.answer,
    explanation: questionObject.explanation,
    userAnswer: trimmedAnswer,
  };

  React.useEffect(() => {
    if (isPressed) {
      modeSessionDispatch({
        type: ActionType.UPDATE_MODE_SESSION,
        payload: modeSessionObject,
      });

      modeDispatch({
        type: ActionType.ADD_MODE_SESSION,
        payload: modeSessionObject,
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
      modeDispatch({ type: ActionType.INCREMENT_SCORE });
    } else {
      setBorderColor("#FC2003");
    }
    setIsPressed(!isPressed);
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
