import * as React from "react";
import { View, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";
import CustomRadioButton from "../CustomRadioButton/CustomRadioButton";

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
  },
});

interface AnswerOptionsProps {
  answers: Array<string>;
  onPress: () => boolean;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = (
  props: AnswerOptionsProps,
) => {
  const [value, setValue] = React.useState("");
  const { answers, onPress } = props;

  return (
    <RadioButton.Group
      onValueChange={(newValue) => setValue(newValue)}
      value={value}
    >
      {answers.map((answer) => {
        return (
          <View style={styles.button}>
            <CustomRadioButton text={answer} value={answer} onPress={onPress} />
          </View>
        );
      })}
    </RadioButton.Group>
  );
};

export default AnswerOptions;
