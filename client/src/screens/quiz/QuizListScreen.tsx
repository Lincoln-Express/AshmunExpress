import * as React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomCard from "../../base/CustomCard/CustomCard";
import IconButton from "../../base/IconButton/IconButton";
import CustomList from "../../base/CustomList/CustomList";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    padding: 8,
    backgroundColor: "#fff",
  },
  icon: {
    right: 0,
    top: 3,
    left: 5,
  },
  title: {
    alignItems: "center",
  },
});

const QuizListScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const quizzes = ["Example", "Practice", "Test", "Tutorial"];
  const levels = ["1", "2", "3", "4"];
  const route = useRoute();
  const { section, topic } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {quizzes.map((quiz) => (
        <CustomList title={quiz} key={quiz}>
          {levels.map((level) => {
            return (
              <CustomCard
                key={level}
                title={`Level ${level}`}
                titleStyle={styles.title}
                elevation={5}
                onPress={() => {
                  navigation.navigate("QuizPage", {
                    topic,
                    section,
                    level,
                    quiz,
                  });
                }}
                left={() => <IconButton name="hourglass" style={styles.icon} />}
              />
            );
          })}
        </CustomList>
      ))}
    </ScrollView>
  );
};

export default QuizListScreen;
