import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import CustomCard from "../../base/customCard/CustomCard";
import UserContext from "../../contexts/UserContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    fontSize: 32,
    marginVertical: 15,
    marginLeft: 10,
  },
  quizText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

const HomeScreen: React.FC<null> = () => {
  const theme = useTheme();
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  const date = new Date();
  const time = date.toTimeString().split(" ")[0];
  const [hours, minutes, seconds] = time.split(":");

  const { firstName, quizzes } = user;
  const greetingText = getGreetingText(parseInt(hours));

  let len = 0;
  if (quizzes) {
    len = quizzes.length > 2 ? quizzes.length - 3 : quizzes.length;
  }
  const lastThreeQuizzes = len === 0 ? null : quizzes.slice(len);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ ...styles.greeting, color: theme.colors.text }}>
        {`${greetingText}, ${firstName}`}
      </Text>

      <View>
        <Text style={{ ...styles.quizText, color: theme.colors.text }}>
          Last Three Quizzes:
        </Text>
        <View>
          {lastThreeQuizzes &&
            lastThreeQuizzes.map((quiz) => {
              const { quizTopic, quizType, timeStamp } = quiz;
              const date = timeStamp.split(" ").slice(1).toString().split(" ");

              return (
                <CustomCard
                  title={`${quizTopic} ${quizType}`}
                  subtitle={`Finished on ${date}`}
                />
              );
            })}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const getGreetingText = (hours) => {
  if (hours < 12) {
    return "Good Morning";
  } else if (hours >= 12 && hours < 16) {
    return "Good Afternoon";
  }

  return "Good evening";
};
