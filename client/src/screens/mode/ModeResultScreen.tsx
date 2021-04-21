import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "react-native-paper/src/core/theming";
import FilledButton from "../../base/filledButton/FilledButton";
import {
  useModeDispatch,
  useModeState,
} from "../../providers/modeProvider/ModeProvider";
import { useModeSessionDispatch } from "../../providers/modeSessionProvider/ModeSessionProvider";
import { ActionType } from "../../types/types";
import { v4 as uuidv4 } from "uuid";
import CustomCard from "../../base/customCard/CustomCard";
import { getResultReview } from "../../utils/utils";
import UserContext from "../../contexts/UserContext";

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
  return new Date().toDateString();
};

const ModeResultScreen: React.FC<null> = (): JSX.Element => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { updateUser } = React.useContext(UserContext);

  const route = useRoute();
  const { totalQuestions, correctAnswersCount, mode } = route.params;
  const Buttons = React.useMemo(() => viewNextOptions(navigation), [
    navigation,
  ]);

  const modeState = useModeState();
  const timeStamp = React.useMemo(() => createTimeStamp(), []);
  const currModeObject = Object.freeze({
    ...modeState,
    id: uuidv4(),
    modeType: mode,
    correctAnswersCount,
    totalQuestions,
    timeStamp,
  });

  const failedQuestions = currModeObject.modeSessionHistory.filter(
    (modeSession) => modeSession.userAnswer != modeSession.answer,
  );
  const modeSessionDispatch = useModeSessionDispatch()!;
  const modeDispatch = useModeDispatch()!;

  React.useEffect(() => {
    updateUser(currModeObject, "mode");

    modeDispatch({ type: ActionType.UPDATE_MODE, payload: currModeObject });

    modeSessionDispatch({ type: ActionType.RESET_MODE_SESSION });

    modeDispatch({ type: ActionType.RESET_MODE });
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

  if (mode === "Example" || mode === "Tutorial") {
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
                key={id.toString()}
                title={`${index + 1}/${failedQuestions.length + 1}`}
                subtitle={customText("Question: ", question)}
                subtitleNumberOfLines={5}
                style={styles.card}
                titleStyle={styles.cardTitle}
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

export default ModeResultScreen;

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
        title="New Mode"
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
        }}
        buttonStyle={styles.secondButton}
        textStyle={styles.secondButtonText}
      />
    </View>
  );
};
