import * as React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, ScrollView } from "react-native";
import CustomCard from "../../base/CustomCard/CustomCard";
import IconButton from "../../base/IconButton/IconButton";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
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
const QuizLevelsScreen: React.FC<null> = () => {
  const levels = ["one", "two", "three", "four"];
  const navigation = useNavigation();
  const route = useRoute();
  const { quizTopic, quizType } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {levels.map((level) => (
        <View style={styles.item} key={level}>
          <CustomCard
            title={`level ${level}`}
            subtitle={" "}
            right={() => (
              <IconButton
                name="arrow-forward"
                handlePress={() => {
                  navigation.navigate("QuizDescription", {
                    level,
                    quizTopic,
                    quizType,
                  });
                }}
                style={styles.icon}
              />
            )}
            elevation={10}
            paragraph={" "}
            uri=""
            onPress={() => {
              navigation.navigate("QuizDescription", {
                level,
                quizTopic,
                quizType,
              });
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default QuizLevelsScreen;
