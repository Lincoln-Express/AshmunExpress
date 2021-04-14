/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-fragments */
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomCard from "../../base/CustomCard/CustomCard";
import IconButton from "../../base/IconButton/IconButton";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#fff",
  },
  item: {
    marginVertical: 10,
    padding: 10,
  },
  iconStyle: {
    marginRight: 15,
    marginBottom: 15,
  },
});

const QuizListScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const quizzes = ["Example", "Practice", "Test", "Tutorial"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {quizzes.map((quiz) => (
        <View style={styles.item}>
          <CustomCard
            title={quiz}
            subtitle={" "}
            key={`${quiz}`}
            right={() => (
              <IconButton
                name="arrow-forward"
                handlePress={() => {
                  navigation.navigate("QuizLevels", { name: quiz });
                }}
                style={styles.iconStyle}
              />
            )}
            elevation={5}
            paragraph={" "}
            uri=""
            onPress={() => {
              navigation.navigate("QuizLevels", { name: quiz });
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default QuizListScreen;
