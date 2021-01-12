/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-fragments */
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import BASE_URL from "../../config/index";
import FilledButton from "../../base/filledButton/FilledButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
    padding: 16,
    backgroundColor: "#fff",
  },
});
const QuizResultsScreen = (): JSX.Element => {
  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigation();
  const route = useRoute();
  // const { name: level } = route.params;
  const [quizList, setQuizList] = React.useState([]);

  React.useEffect(async () => {
    await axios.get(`${BASE_URL}quizList`).then((res) => {
      setQuizList(res.data);
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Text>Quizzes</Text>
      </View>
      {quizList.map((quiz) => (
        <FilledButton
          title={quiz}
          handlePress={() => navigation.push("Quiz", { name: quiz })}
        />
      ))}
    </>
  );
};

export default QuizResultsScreen;
