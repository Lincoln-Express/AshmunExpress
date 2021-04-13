import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import {
  StackActions,
  useNavigation,
  useNavigationState,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "react-native-paper/src/core/theming";
import FilledButton from "../../base/filledButton/FilledButton";
import { useUserDispatch } from "../../providers/userProvider/UserProvider";
import {
  useQuizDispatch,
  useQuizState,
} from "../../providers/quizProvider/QuizProvider";
import { useQuizSessionDispatch } from "../../providers/quizSessionProvider/QuizSessionProvider";
import { ActionType } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import CustomCard from "../../base/customCard/CustomCard";
import { getResultReview } from "../../utils/utils";

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 25,
  },
  reviewText: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 25,
  },
  scoreText: {
    fontSize: 36,
    textAlign: "center",
  },
  firstButton: {
    maxWidth: "40%",
  },
  secondButton: {
    maxWidth: "40%",
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "#273A8F",
  },
  secondButtonText: {
    color: "#273A8F",
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    margin: 12,
  },
  cardTitle: {
    fontSize: 24,
    textAlign: "left",
  },
  customTextStyle: {
    fontWeight: "bold",
  },
  failedQuestions: {
    marginVertical: 15,
  },
});

const createTimeStamp = () => {
  return new Date().toISOString();
};

const QuizResultScreen: React.FC<null> = (): JSX.Element => {
  const theme = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const { totalQuestions, correctAnswersCount, quiz } = route.params;
  const Buttons = React.useMemo(() => viewNextOptions(navigation), [
    navigation,
  ]);

  const quizState = useQuizState();
  const timeStamp = React.useMemo(() => createTimeStamp(), []);
  const currQuizObject = Object.freeze({
    ...quizState,
    id: uuidv4(),
    quizType: quiz,
    correctAnswersCount,
    totalQuestions,
    timeStamp,
  });

  const failedQuestions = currQuizObject.quizSessionHistory.filter(
    (quizSession) => quizSession.userAnswer != quizSession.answer,
  );
  const quizSessionDispatch = useQuizSessionDispatch();
  const quizDispatch = useQuizDispatch();
  const userDispatch = useUserDispatch();

  React.useEffect(() => {
    if (quizDispatch) {
      quizDispatch({ type: ActionType.UPDATE_QUIZ, payload: currQuizObject });
    }

    if (quizSessionDispatch) {
      quizSessionDispatch({ type: ActionType.RESET_QUIZ_SESSION });
    }

    if (userDispatch) {
      userDispatch({ type: ActionType.ADD_QUIZ, payload: currQuizObject });
    }

    if (quizDispatch) {
      quizDispatch({ type: ActionType.RESET_QUIZ });
    }
  }, []);

  const lowerQuartile = 0.25 * totalQuestions;
  const upperQuartile = 3 * lowerQuartile;
  const median = upperQuartile - lowerQuartile;
  const review = getResultReview(
    totalQuestions,
    correctAnswersCount,
    lowerQuartile,
    median,
    upperQuartile,
  );

  if (quiz === "Example" || quiz === "Tutorial") {
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
    <ScrollView contentContainerStyle={styles.outerContainer}>
      <Text style={{ ...styles.reviewText, color: theme.colors.text }}>
        {review}
      </Text>
      <Text style={{ ...styles.scoreText, color: theme.colors.primary }}>
        YOUR SCORE:
      </Text>
      <Text style={{ ...styles.scoreText, color: theme.colors.text }}>
        {`${correctAnswersCount}/${totalQuestions}`}
      </Text>
      {failedQuestions.length > 0 ? (
        <View style={styles.failedQuestions}>
          <Text
            style={{
              textAlign: "left",
              fontSize: 24,
              marginLeft: 12,
              color: theme.colors.text,
            }}
          >
            Explanations:
          </Text>
          {failedQuestions.map((failedQuestion, index) => {
            const {
              question,
              userAnswer,
              answer,
              explanation,
              id,
            } = failedQuestion;

            const userAnswerParagraph = customText("Your answer: ", userAnswer);
            const correctAnswer = customText("The correct answer: ", answer);
            const explanationParagraph = customText(
              "Explanation:",
              explanation,
            );

            return (
              <CustomCard
                key={id}
                title={`${index + 1}/${failedQuestions.length + 1}`}
                subtitle={customText("Question: ", question)}
                subtitleNumberOfLines={5}
                style={styles.card}
                titleStyle={styles.cardTitle}
                onPress={() => {}}
                elevation={5}
                paragraphs={[
                  userAnswerParagraph,
                  correctAnswer,
                  explanationParagraph,
                ]}
              />
            );
          })}
        </View>
      ) : null}
      {Buttons}
    </ScrollView>
  );
};

export default QuizResultScreen;

const customText = (string1: string, string2: string) => {
  return `${string1} ${string2}`;
};

const viewNextOptions = (navigation) => {
  return (
    <View style={styles.innerContainer}>
      <FilledButton
        title="Go Home"
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
          // Add a loading screen/splash screen
          navigation.navigate("Home");
        }}
        buttonStyle={styles.firstButton}
      />
      <FilledButton
        title="New Quiz"
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
        }}
        buttonStyle={styles.secondButton}
        textStyle={styles.secondButtonText}
      />
    </View>
  );
};
