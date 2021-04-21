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
  modeText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

// TODO:Check the length of the modes array to determine how many last quizzes to show,
// TODO: if the length is zero, display a card that says "Check the topics page for the available modes"

const HomeScreen: React.FC<null> = () => {
  const theme = useTheme();
  const userContext = React.useContext(UserContext);
  const { user } = userContext;
  const date = new Date();
  const time = date.toTimeString().split(" ")[0];
  const [hours, minutes, seconds] = time.split(":");

  const { firstName, modes } = user;
  const greetingText = getGreetingText(parseInt(hours));

  let len = 0;
  if (modes) {
    len = modes.length > 2 ? modes.length - 3 : modes.length;
  }
  const lastThreeModes = len === 0 ? null : modes.slice(len);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ ...styles.greeting, color: theme.colors.text }}>
        {`${greetingText}, ${firstName}`}
      </Text>

      <View>
        <Text style={{ ...styles.modeText, color: theme.colors.text }}>
          Last Three Modes:
        </Text>
        <View>
          {lastThreeModes &&
            lastThreeModes.map((mode) => {
              const { modeTopic, modeType, timeStamp } = mode;
              const date = timeStamp.split(" ").slice(1).toString().split(" ");

              return (
                <CustomCard
                  title={`${modeTopic} ${modeType}`}
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
