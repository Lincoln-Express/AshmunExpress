/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-fragments */
import React from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SectionCard from "../../base/SectionCard/SectionCard";
import IconButton from "../../base/IconButton/IconButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    padding: 16,
    backgroundColor: "#fff",
  },
});

const QuizListScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const quizzes = ["Example", "Practice", "Test", "Tutorial"];

  return (
    <View style={styles.container}>
      {quizzes.map((quiz) => (
        <SectionCard
          title={quiz}
          subtitle={" "}
          right={() => (
            <IconButton
              name="arrow-forward"
              handlePress={() => {
                navigation.navigate("QuizLevels", { name: quiz });
              }}
            />
          )}
          elevation={5}
          paragraph={" "}
          uri={`../../../assets/${quiz}.jpg`}
          onPress={() => {
            navigation.navigate("QuizLevels", { name: quiz });
          }}
        />
      ))}
    </View>
  );
};

export default QuizListScreen;
