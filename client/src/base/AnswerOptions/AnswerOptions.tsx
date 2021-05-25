import * as React from "react";
import { View, StyleSheet } from "react-native";
import shuffle from "lodash/shuffle";
import AnswerButton from "../answerButton/AnswerButton";
import AnswerButtonContext from "../../contexts/AnswerButtonContext";
import { widthSize } from "../../themes/sizes";
import uuid from "react-native-uuid";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: widthSize.l,
  },
});

interface AnswerOptionsProps {
  answers: Array<string>;
  questionObject: Record<string, unknown>;
  isCorrect: (
    questionObject: Record<string, unknown>,
    answer: string,
  ) => boolean;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = (
  props: AnswerOptionsProps,
) => {
  const { answers, questionObject, isCorrect } = props;
  const [disabled, setDisabled] = React.useState(false);

  const toggleDisability = (hasBeenPressed: boolean) => {
    return setDisabled(hasBeenPressed);
  };

  const answerButtonPreferences = {
    toggleDisability,
    disabled,
  };

  let shuffledAnswers = answers;

  React.useEffect(() => {
    shuffledAnswers = shuffle(answers);
  }, [answers]);

  return (
    <AnswerButtonContext.Provider value={answerButtonPreferences}>
      {shuffledAnswers.map((answer) => {
        const isCorrectAnswer = isCorrect(questionObject, answer);
        return (
          <View style={styles.container} key={uuid.v4().toString()}>
            <AnswerButton
              answer={answer}
              isCorrectAnswer={isCorrectAnswer}
              disabled={disabled}
              questionObject={questionObject}
            />
          </View>
        );
      })}
    </AnswerButtonContext.Provider>
  );
};

export default AnswerOptions;
