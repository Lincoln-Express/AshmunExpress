import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "react-native-paper/src/core/theming";
import pictures from "../../pictures/pictures";

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});

interface QuestionProps {
  question: string;
  pictureName: string | undefined;
}

// TODO: Split the question text on the "picture" word index
const Question: React.FC<QuestionProps> = (props: QuestionProps) => {
  const { question, pictureName } = props;
  const theme = useTheme();

  let questionStrings: Array<string> = [];

  if (pictureName) {
    const firstPictureIndex = question.indexOf(":");
    // contains one image at the end of the question
    if (firstPictureIndex == question.length) {
      questionStrings = question.split(":");

      return (
        <View>
          <Text>{questionStrings[0]}</Text>

          <Text>{questionStrings[1]}</Text>
        </View>
      );
    }
    // contains multiple images
    else {
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, color: theme.colors.text }}>
        {question}
      </Text>
    </View>
  );
};

export default Question;
