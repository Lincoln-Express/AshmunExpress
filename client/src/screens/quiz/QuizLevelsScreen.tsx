import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, ScrollView } from "react-native";
import CustomCard from "../../base/CustomCard/CustomCard";
import IconButton from "../../base/IconButton/IconButton";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  cardStyle: {
    marginVertical: 10,
    padding: 10,
  },
  iconStyle: {
    marginRight: 15,
    marginBottom: 15,
  },
});
const QuizLevelsScreen: React.FC<null> = () => {
  const levels = ["one", "two", "three", "four"];
  const navigation = useNavigation();
  const route = useRoute();
  const quizType = route.params?.name;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {levels.map((levelNum) => (
        <View style={styles.cardStyle}>
          <CustomCard
            title={`level ${levelNum}`}
            key={`level ${levelNum}${Math.random()}`}
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
                style={styles.iconStyle}
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
        </View>
      ))}
    </ScrollView>
  );
};

export default QuizLevelsScreen;
