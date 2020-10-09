import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View } from "react-native";
import SectionCard from "../../base/SectionCard/SectionCard";
import IconButton from "../../base/IconButton/IconButton";

const QuizLevelsScreen = () => {
  const levels = 4;
  const navigation = useNavigation();
  const route = useRoute();
  const quizType = route.params.name;

  
    for (let levelNum = 1; levelNum <= levels; levelNum++) {
      return (
        <View>
          <SectionCard
            title={`level ${levelNum}`}
            subtitle={" "}
            right={() => (
              <IconButton
                name="arrow-forward"
                handlePress={() => {
                  navigation.navigate("QuizLevels", { name: levelNum, quizType: quizType });
                }}
              />
            )}
            elevation={5}
            paragraph={" "}
            uri={`../../../assets/level ${levelNum}.jpg`}
            onPress={() => {
              navigation.navigate("QuizLevels", { name: levelNum, quizType: quizType });
            }}
          />
        </View>
      );
    }
  }
};

export default QuizLevelsScreen;
