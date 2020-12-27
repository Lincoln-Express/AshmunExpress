import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper/src/core/theming";

const styles = StyleSheet.create({
  text: {
    fontWeight: "500",
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
  const theme = useTheme();
  return (
    <View>
      <Text style={{ ...styles.text, color: theme.colors.text }}>
        {`Question ${counter + 1}/${totalNumberOfQuestions}`}
      </Text>
    </View>
  );
};

export default QuestionCount;
