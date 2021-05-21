import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "react-native-paper/src/core/theming";
import pictures from "../../questionImages/questionImages";

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

const Question: React.FC<QuestionProps> = (props: QuestionProps) => {
  const { question, pictureName } = props;
  const theme = useTheme();
  const sep = "[picture]";

  // if (pictureName && sep === "[picture]") {
  //   const questionStrings = question.split(sep);

  //   if (questionStrings.length === 2) {
  //     return (
  //       <View>
  //         <Text>{questionStrings[0]}</Text>
  //         // TODO add image
  //         <Text>{questionStrings[1]}</Text>
  //       </View>
  //     );
  //   }
  // }

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.text, color: theme.colors.text }}>
        {question}
      </Text>
    </View>
  );
};

export default Question;
