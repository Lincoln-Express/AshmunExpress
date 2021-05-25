import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "react-native-paper/src/core/theming";
import axios from "axios";
import FilledButton from "../../base/filledButton/FilledButton";
import {
  useModeDispatch,
  useModeState,
} from "../../providers/modeProvider/ModeProvider";
import { useModeSessionDispatch } from "../../providers/modeSessionProvider/ModeSessionProvider";
import { ActionType, ModeSession } from "../../types/types";
import CustomCard from "../../base/customCard/CustomCard";
import {
  changePropsToSnakeCase,
  customText,
  getResultReview,
} from "../../utils/utils";
import UserContext from "../../contexts/UserContext";
import CustomImage from "../../base/customImage/CustomImage";
import CustomAnimation from "../../base/customAnimation/CustomAnimation";
import { heightSize, widthSize } from "../../themes/sizes";
import BASE_URL from "../../config";

const styles = StyleSheet.create({
  outerContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: widthSize.m,
  },
  reviewText: {
    fontSize: widthSize.m,
    textAlign: "center",
    marginTop: widthSize.m,
  },
  scoreText: {
    fontSize: widthSize.s * 2.4,
    textAlign: "center",
  },
  secondButton: {
    backgroundColor: "#F5F5F5",
    borderWidth: widthSize.s / 7.5,
    borderColor: "#273A8F",
  },
  secondButtonText: {
    color: "#273A8F",
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    margin: widthSize.m / 2,
  },
  cardTitle: {
    fontSize: widthSize.m,
    textAlign: "left",
  },
  customTextStyle: {
    fontWeight: "bold",
  },
  failedQuestions: {
    marginVertical: heightSize.s / 2,
  },
});

const createTimeStamp = () => {
  return new Date().toISOString();
};

const ModeResultScreen: React.FC<null> = (): JSX.Element => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = React.useContext(UserContext);
  const [failedQuestions, setFailedQuestions] = React.useState(
    [] as ModeSession[],
  );
  const { updateUser } = React.useContext(UserContext);

  const route = useRoute();
  const { totalQuestions, correctAnswersCount, mode, level, section, topic } =
    route.params;
  const Buttons = React.useMemo(
    () => viewNextOptions(navigation),
    [navigation],
  );

  const modeState = useModeState();
  const timestamp = React.useMemo(() => createTimeStamp(), []);

  const modeSessionDispatch = useModeSessionDispatch()!;
  const modeDispatch = useModeDispatch()!;

  React.useEffect(() => {
    const currModeObject = {
      ...modeState,
      userId: user.id,
      modeType: mode,
      correctAnswersCount,
      totalQuestions,
      timestamp,
      level,
      modeSection: section,
      modeTopic: topic,
    };

    const modeSessionArray = currModeObject.modeSessionHistory.map(
      (modeSession) => {
        return (modeSession = { ...modeSession, modeId: currModeObject.id });
      },
    );

    const newModeObject = changePropsToSnakeCase(currModeObject);
    const newModeSessionArray = changePropsToSnakeCase(modeSessionArray);

    async function postData() {
      try {
        await axios.post(`${BASE_URL}/mode`, newModeObject);
        await axios.post(`${BASE_URL}/mode-session`, newModeSessionArray);
      } catch (error) {
        if (error.request) {
          console.error(`post request failed: ${error.request}`);
        } else if (error.response) {
          console.error(`post response failed: ${error.response.data}`);
          console.error(`post response failed: ${error.response.status}`);
        } else {
          console.error(`error ${error.message}`);
        }
      }
    }

    postData();
    setFailedQuestions(
      modeSessionArray.filter(
        (modeSession) => modeSession.userAnswer != modeSession.answer,
      ),
    );

    updateUser(currModeObject, "mode");

    modeDispatch({ type: ActionType.UPDATE_MODE, payload: currModeObject });

    modeSessionDispatch({ type: ActionType.RESET_MODE_SESSION });

    modeDispatch({ type: ActionType.RESET_MODE });
  }, []);

  const lowerQuartile = 0.25 * totalQuestions;
  const upperQuartile = 3 * lowerQuartile;
  const median = upperQuartile - lowerQuartile;
  const review = getResultReview(
    correctAnswersCount,
    lowerQuartile,
    median,
    mode,
  );

  const ResultImage = getResultImage(review);

  if (mode === "Example" || mode === "Tutorial") {
    return (
      <View style={styles.outerContainer}>
        <Text style={{ ...styles.reviewText, color: theme.colors.text }}>
          {`${review}`}
        </Text>
        <CustomAnimation
          imageSource={require("../../../assets/json-animations/good-job.json")}
        />
        {Buttons}
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.outerContainer}>
      <Text style={{ ...styles.reviewText, color: theme.colors.text }}>
        {`${review}!`}
      </Text>
      <Text style={{ ...styles.scoreText, color: theme.colors.primary }}>
        YOUR SCORE:
      </Text>
      {ResultImage}
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
            const { question, userAnswer, answer, explanation, id } =
              failedQuestion;

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

const viewNextOptions = (navigation) => {
  return (
    <View style={styles.innerContainer}>
      <FilledButton
        title="Go Home"
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
          navigation.navigate("Home");
        }}
      />
      <FilledButton
        title="Topics"
        onPress={() => {
          navigation.dispatch(StackActions.popToTop());
        }}
        buttonStyle={styles.secondButton}
        textStyle={styles.secondButtonText}
      />
    </View>
  );
};

const getResultImage = (review: string) => {
  if (review === "Excellent") {
    return (
      <CustomAnimation
        imageSource={require("../../../assets/json-animations/excellent.json")}
      />
    );
  }

  if (review === "Good") {
    return (
      <CustomAnimation
        imageSource={require("../../../assets/json-animations/good-job.json")}
      />
    );
  }

  return <CustomImage image={"../../../assets/svg/sad.svg"} />;
};
