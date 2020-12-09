/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-fragments */
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Paragraph } from "react-native-paper";
import TextButton from "../../base/TextButton/TextButton";
import CustomDialog from "../../base/CustomDialog/CustomDialog";
import quizPageStyle from "../../utils/styles/quizPageStyle";
import {
  quizTopicDescription,
  quizTypeDescription,
} from "../../utils/quizDescription/quizDescription";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    marginVertical: 10,
    padding: 10,
  },
});
const QuizDescriptionScreen: React.FC<null> = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { quizTopic, level, quizType } = route.params;
  const topic = quizTopicDescription.find((val) => val.name === quizTopic);
  const type = quizTypeDescription.find((val) => val.name === quizType);

  // TODO: Add one more paragraph for type description, then add proper styling there.

  return (
    <View style={styles.container}>
      <Paragraph>
        {topic !== undefined ? topic.description : null}
        {type !== undefined ? type.description : null}
      </Paragraph>
      <View style={styles.dialog} key={quizTopic}>
        <CustomDialog
          dialogText="Start"
          content="Are you ready?"
          actionButtons={[
            <>
              <TextButton
                title="No"
                handlePress={() => {
                  navigation.navigate("QuizDescription", { quizTopic, level });
                }}
              />
              <TextButton
                title="Yes"
                handlePress={() => {
                  navigation.navigate("QuizPage", { quizTopic, level });
                }}
              />
            </>,
          ]}
        />
      </View>
    </View>
  );
};

export default QuizDescriptionScreen;
