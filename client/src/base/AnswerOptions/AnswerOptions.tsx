import * as React from "react";
import { View, StyleSheet } from "react-native";
import { shuffle } from "lodash/shuffle";
import AnswerButton from "../answerButton/AnswerButton";
import AnswerButtonContext from "../../contexts/AnswerButtonContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
});

interface AnswerOptionsProps {
  answers: Array<string>;
  questionObject: Record<string, any>;
  isCorrect: (questionObject: Record<string, any>, answer: string) => boolean;
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

  const shuffledAnswers = shuffle(answers);
  return (
    <AnswerButtonContext.Provider value={answerButtonPreferences}>
      <View>
        {shuffledAnswers.map((answer) => {
          const isCorrectAnswer = isCorrect(questionObject, answer);
          return (
            <View style={styles.container} key={answer}>
              <AnswerButton
                answer={answer}
                isCorrectAnswer={isCorrectAnswer}
                disabled={disabled}
                questionObject={questionObject}
              />
            </View>
          );
        })}
      </View>
    </AnswerButtonContext.Provider>
  );
};

export default AnswerOptions;
