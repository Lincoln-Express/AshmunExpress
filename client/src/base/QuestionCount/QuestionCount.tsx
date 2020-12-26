import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
    color: "#273A7F",
  },
});

interface QuestionCountProps {
  counter: number;
  totalNumberOfQuestions: number;
}

const QuestionCount: React.FC<QuestionCountProps> = (
  props: QuestionCountProps,
) => {
  const { counter, totalNumberOfQuestions } = props;
  return (
    <View>
      <Text style={styles.text}>
        {`Question ${counter + 1}/${totalNumberOfQuestions}`}
      </Text>
    </View>
  );
};

export default QuestionCount;
