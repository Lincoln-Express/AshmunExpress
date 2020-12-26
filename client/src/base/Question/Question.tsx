import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

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
  return (
    <View>
      <Text style={styles.text}>{question}</Text>
    </View>
  );
};

export default Question;
