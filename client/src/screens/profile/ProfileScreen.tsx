import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import Icon from "../../base/icon/Icon";
import CustomCard from "../../base/customCard/CustomCard";
import useImagePicker from "../../hooks/useImagePicker/useImagePicker";
import CustomUserAvatar from "../../base/customUserAvatar/CustomUserAvatar";
import UserContext from "../../contexts/UserContext";
import { Mode } from "../../types/types";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  settingsIcon: {
    top: 10,
    right: 10,
  },
  card: {
    margin: 15,
  },
  cardIcon: {
    top: 10,
    right: 10,
  },
});

const ProfileScreen: React.FC<null> = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const imagePicker = useImagePicker();
  const { image, pickImage } = imagePicker;
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  const { firstName, lastName, modes } = user;
  const numberOfTestsTaken = modes.length;
  const { topic, totalNumberOfQuestions, highestScore, section } =
    getHighestScoreText(modes);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Icon
        name={"settings"}
        onPress={() => navigation.navigate("Settings")}
        size={24}
        style={styles.settingsIcon}
      />
      <CustomUserAvatar
        name={`${firstName} ${lastName}`}
        secondaryDetail={"Student"}
        onPress={pickImage}
        uri={String(image.uri)}
        nameStyle={{ color: theme.colors.text }}
      />
      <View style={styles.card}>
        <CustomCard
          title={"Number of tests: "}
          elevation={5}
          subtitle={`${numberOfTestsTaken}`}
          left={() => <Icon name={"flame"} style={styles.cardIcon} />}
        />
        <CustomCard
          title={`Highest score: ${highestScore}/${totalNumberOfQuestions}`}
          elevation={5}
          subtitle={`Topic: ${topic}, Section: ${section}`}
          left={() => <Icon name={"disc"} style={styles.cardIcon} />}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const getHighestScoreText = (quizzes: Mode[]) => {
  let highestScore = 0;
  let topic = "";
  let section = "";
  let totalNumberOfQuestions = 0;

  quizzes.forEach((quiz) => {
    const { correctAnswersCount, modeSection, modeTopic, numberOfQuestions } =
      quiz;
    if (correctAnswersCount > highestScore) {
      (highestScore = correctAnswersCount),
        (topic = modeTopic),
        (totalNumberOfQuestions = numberOfQuestions),
        (section = modeSection);
    }
  });
  return {
    highestScore,
    topic,
    section,
    totalNumberOfQuestions,
  };
};
