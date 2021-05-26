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
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  settingsIcon: {
    top: heightSize.s / 3,
    right: widthSize.l / 3,
  },
  card: {
    margin: widthSize.s,
  },
  cardIcon: {
    top: heightSize.s / 3,
    right: widthSize.l / 3,
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
  const firstCardIcon = () => <Icon name={"flame"} style={styles.cardIcon} />;
  const secondCardIcon = () => <Icon name={"disc"} style={styles.cardIcon} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Icon
        name={"settings"}
        onPress={() => navigation.navigate("Settings")}
        size={widthSize.m}
        style={styles.settingsIcon}
      />
      {/* <CustomUserAvatar
        name={`${firstName} ${lastName}`}
        secondaryDetail={"Student"}
        onPress={pickImage}
        uri={String(image.uri)}
        nameStyle={{ color: theme.colors.text }}
      /> */}
      <View style={styles.card}>
        <CustomCard
          title={"Number of tests: "}
          elevation={5}
          subtitle={`${numberOfTestsTaken}`}
          left={firstCardIcon}
        />
        <CustomCard
          title={`Highest score: ${highestScore}/${totalNumberOfQuestions}`}
          elevation={5}
          subtitle={`Topic: ${topic}, Section: ${section}`}
          left={secondCardIcon}
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
