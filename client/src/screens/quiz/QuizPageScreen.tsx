import * as React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import shuffle from "lodash/shuffle";
import Loading from "../../base/loading/Loading";
import useFetch from "../../hooks/useFetch/useFetch";
import QuizHelper from "../../quizHelper/QuizHelper";
import FilledButton from "../../base/filledButton/FilledButton";
import { getEndIndex } from "../../utils/utils";

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
    marginTop: 20,
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
    backgroundColor: "#F5F5F5",
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

const QuizPageScreen: React.FC<any> = (): JSX.Element => {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { section, quiz, level } = route.params;
  const url = `${quiz.toLowerCase()}/${level}/section/${section}`;

  const { isError, isLoading, data } = useFetch(url);

  if (data !== undefined) {
    if (data.length === 0) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={{ ...styles.text, color: theme.colors.text }}>
            There are no questions for this section for now.
          </Text>
        </ScrollView>
      );
    }
    const shuffledArray = React.useMemo(() => shuffle(data), [data]);
    const len = shuffledArray.length;
    const endIndex = getEndIndex(len);
    const questions = shuffledArray.slice(0, endIndex);
    return (
      <ScrollView contentContainerStyle={styles.outerContainer}>
        <Text style={{ ...styles.readyText, color: theme.colors.text }}>
          Are you ready ?
        </Text>
        <View style={styles.innerContainer}>
          <FilledButton
            title="Not yet"
            onPress={() => {
              navigation.goBack();
            }}
            buttonStyle={styles.firstButton}
          />

          <FilledButton
            title="Get Started"
            onPress={() => {
              navigation.navigate(`${quiz}`, {
                questions,
                url,
                quiz,
              });
            }}
            buttonStyle={styles.secondButton}
            textStyle={styles.secondButtonText}
          />
        </View>
      </ScrollView>
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
