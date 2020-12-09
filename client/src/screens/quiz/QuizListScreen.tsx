/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-fragments */
import * as React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomCard from "../../base/CustomCard/CustomCard";
import IconButton from "../../base/IconButton/IconButton";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 8,
  },
  item: {
    marginVertical: 10,
    padding: 10,
  },
  icon: {
    marginRight: 15,
    marginBottom: 15,
  },
});

const QuizListScreen: React.FC<null> = (): JSX.Element => {
  const navigation = useNavigation();
  const quizzes = ["Example", "Practice", "Test", "Tutorial"];
  const route = useRoute();
  const { item: quizTopic } = route.params?.name;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {quizzes.map((quizType) => (
        <View style={styles.item} key={quizType}>
          <CustomCard
            title={quizType}
            subtitle={" "}
            right={() => (
              <IconButton
                name="arrow-forward"
                handlePress={() => {
                  navigation.navigate("QuizLevels", {
                    name: quizType,
                    quizTopic,
                  });
                }}
                style={styles.icon}
              />
            )}
            elevation={5}
            paragraph={" "}
            uri=""
            onPress={() => {
              navigation.navigate("QuizLevels", { name: quizType, quizTopic });
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default QuizListScreen;
