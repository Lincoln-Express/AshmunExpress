import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import CustomCard from "../../base/CustomCard/CustomCard";
import IconButton from "../../base/IconButton/IconButton";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
const QuizLevelsScreen: React.FC<null> = () => {
  const levels = ["one", "two", "three", "four"];
  const navigation = useNavigation();
  const route = useRoute();
  const quizType = route.params?.name;

  return (
    <View style={styles.container}>
      {levels.map((levelNum) => (
        <CustomCard
          title={`level ${levelNum}`}
          key={`level ${levelNum}`}
          subtitle={" "}
          right={() => (
            <IconButton
              name="arrow-forward"
              handlePress={() => {
                navigation.navigate("QuizDescription", {
                  num: levelNum,
                  quizType,
                });
              }}
            />
          )}
          elevation={5}
          paragraph={" "}
          uri=""
          onPress={() => {
            navigation.navigate("QuizDescription", {
              num: levelNum,
              quizType,
            });
          }}
        />
      ))}
    </View>
  );
};

export default QuizLevelsScreen;
