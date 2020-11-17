/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-fragments */
import React from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Paragraph } from "react-native-paper";
import TextButton from "../../base/TextButton/TextButton";
import CustomDialog from "../../base/CustomDialog/CustomDialog";
import quizPageStyle from "../../utils/styles/quizPageStyle";
import mainDescription from "../../utils/quizDescription/quizDescription";

const QuizDescriptionScreen: React.FC<null> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { quizType, num } = route.params;

  return (
    <View style={quizPageStyle.container}>
      <Paragraph>
        {mainDescription.find((val) => val.name === quizType)?.des}
      </Paragraph>
      <CustomDialog
        showDialogText="Start"
        content="Are you ready?"
        actionButtons={[
          <>
            <TextButton
              title="No"
              handlePress={() => {
                navigation.navigate("QuizDescription", { quizType, num });
              }}
            />
            <TextButton
              title="Yes"
              handlePress={() => {
                navigation.navigate("QuizPage", { quizType, num });
              }}
            />
          </>,
        ]}
      />
    </View>
  );
};

export default QuizDescriptionScreen;
