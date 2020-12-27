import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper/src/core/theming";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontWeight: "500",
  },
});

interface QuestionProps {
  question: string;
}
const Question: React.FC<QuestionProps> = (props: QuestionProps) => {
  const { question } = props;
  const theme = useTheme();
  return (
    <View>
      <Text style={{ ...styles.text, color: theme.colors.text }}>
        {question}
      </Text>
    </View>
  );
};

export default Question;
