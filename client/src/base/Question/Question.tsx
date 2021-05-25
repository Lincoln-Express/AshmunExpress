import * as React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useTheme } from "react-native-paper/src/core/theming";
import questionImages from "../../questionImages/questionImages";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: widthSize.xl / 2,
  },
  picture: {
    marginVertical: heightSize.s / 3,
    alignSelf: "center",
  },
});

interface QuestionProps {
  question: string;
  pictureTitle: string | undefined;
}

const Question: React.FC<QuestionProps> = (props: QuestionProps) => {
  const { question, pictureTitle } = props;
  const theme = useTheme();
  const sep = "[picture]";

  if (pictureTitle) {
    const questionStrings = question.split(sep);
    const picture = questionImages.find(
      (picture) => picture.title === pictureTitle,
    )?.image;

    if (questionStrings.length === 2) {
      return (
        <View>
          <Text style={{ ...styles.text, color: theme.colors.text }}>
            {questionStrings[0]}
          </Text>
          <Image source={picture} style={styles.picture} />
          <Text style={{ ...styles.text, color: theme.colors.text }}>
            {questionStrings[1]}
          </Text>
        </View>
      );
    }
  }

  return (
    <View>
      <Text style={{ ...styles.text, color: theme.colors.text }}>
        {question}
      </Text>
    </View>
  );
};

export default Question;
