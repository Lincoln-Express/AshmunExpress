import * as React from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import QuizHelper from "../../utils/quizHelper/QuizHelper";
import CustomRadioButton from "../customRadioButton/CustomRadioButton";

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
  },
});

interface AnswerOptionsProps {
  answers: Array<string>;
  questionObject: Record<string, any>;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = (
  props: AnswerOptionsProps,
) => {
  const [value, setValue] = React.useState("");
  const { answers, questionObject } = props;
  const answerOptionsHelper = QuizHelper();

  const { checkValidAnswer } = answerOptionsHelper;
  return (
    <RadioButton.Group
      onValueChange={(newValue) => setValue(newValue)}
      value={value}
    >
      {answers.map((answer) => {
        const isCorrect = checkValidAnswer(questionObject, answer);

        return (
          <View style={styles.button}>
            <CustomRadioButton
              text={answer}
              value={answer}
              isCorrect={isCorrect}
            />
          </View>
        );
      })}
    </RadioButton.Group>
  );
};

export default AnswerOptions;
