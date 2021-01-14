import * as React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import shuffle from "lodash/shuffle";
import Loading from "../../base/loading/Loading";
import useFetch from "../../hooks/useFetch/useFetch";
import QuizHelper from "../../utils/quizHelper/QuizHelper";
import FilledButton from "../../base/filledButton/FilledButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  firstButton: {
    maxWidth: "40%",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
  },

  readyText: {
    fontSize: 24,
    textAlign: "center",
  },
  secondButton: {
    maxWidth: "40%",
    backgroundColor: "#FFF",
    borderWidth: 2,
    borderColor: "#273A8F",
  },
  secondButtonText: {
    color: "#273A8F",
  },
  text: {
    textAlign: "center",
    fontSize: 36,
  },
});

const quizPageScreenHelper = QuizHelper();
const QuizPageScreen: React.FC<null> = (): JSX.Element => {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { section, quiz, level } = route.params;
  const { getEndIndex } = quizPageScreenHelper;

  const { isError, isLoading, data } = useFetch(
    `${quiz.toLowerCase()}/${level}/section/${section}`,
  );

  if (data !== undefined) {
    const shuffledArray: Array<Record<string, any>> = shuffle(data);
    const len = shuffledArray.length;
    const endIndex = getEndIndex(len);
    const questions = shuffledArray.slice(0, endIndex);
    return (
      <View style={styles.outerContainer}>
        <Text style={{ ...styles.readyText, color: theme.colors.text }}>
          Are you ready ?
        </Text>
        <View style={styles.innerContainer}>
          <FilledButton
            title="Not yet"
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.firstButton}
          />

          <FilledButton
            title="Get Started"
            onPress={() => {
              navigation.navigate(`${quiz}`, {
                questions,
                quiz,
              });
            }}
            style={styles.secondButton}
            buttonStyle={styles.secondButtonText}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && <Loading loading={isLoading} />}
      {isError && (
        <Text style={{ ...styles.text, color: theme.colors.text }}>
          Failed to Load!
        </Text>
      )}
    </ScrollView>
  );
};

export default QuizPageScreen;
