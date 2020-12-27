import * as React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper/src/core/theming";
import FilledButton from "../../base/filledButton/FilledButton";
import QuizHelper from "../../utils/quizHelper/QuizHelper";

const HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    height: HEIGHT,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  reviewText: {
    fontSize: 24,
    textAlign: "center",
  },
  scoreText: {
    fontSize: 36,
  },
  firstButton: {
    maxWidth: "40%",
  },
  secondButton: {
    maxWidth: "40%",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#273A8F",
  },
  secondButtonText: {
    color: "#273A8F",
  },
});

interface QuizResultProps {
  totalQuestions?: number;
  correctChoices?: number;
  quiz?: string;
}

const quizResultHelper = QuizHelper();
const QuizResultScreen: React.FC<QuizResultProps> = (
  props: QuizResultProps,
): JSX.Element => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { totalQuestions, correctChoices, quiz } = props;
  let review = "empty";
  const { getResultReview } = quizResultHelper;

  if (totalQuestions !== undefined && correctChoices !== undefined) {
    const lowerQuartile = (correctChoices + 1) / 4;
    const middleQuartile = lowerQuartile * 2;
    const upperQuartile = lowerQuartile * 3;
    review = getResultReview(
      totalQuestions,
      correctChoices,
      lowerQuartile,
      middleQuartile,
      upperQuartile,
    );
  }
  const Buttons = viewNextOptions(navigation);

  if (quiz === "Example" || quiz === "Practice") {
    return (
      <View style={styles.outerContainer}>
        <Text style={{ ...styles.reviewText, color: theme.colors.text }}>
          Good Job!
        </Text>
        {Buttons}
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <Text style={{ ...styles.reviewText, color: theme.colors.text }}>
        {review}
      </Text>
      <Text style={{ color: theme.colors.primary }}>YOUR SCORE</Text>
      <Text style={{ ...styles.scoreText, color: theme.colors.text }}>
        {`${correctChoices} / ${totalQuestions}`}
      </Text>
      {Buttons}
    </View>
  );
};

export default QuizResultScreen;

QuizResultScreen.defaultProps = {
  totalQuestions: 0,
  correctChoices: 0,
  quiz: "",
};

const viewNextOptions = (navigation: any) => {
  return (
    <View style={styles.innerContainer}>
      <FilledButton
        title="Go Home"
        onPress={() => navigation.popToTop()}
        style={styles.firstButton}
      />
      <FilledButton
        title="New Quiz"
        onPress={() => navigation.navigate("Quiz")}
        style={styles.secondButton}
        buttonStyle={styles.secondButtonText}
      />
    </View>
  );
};
