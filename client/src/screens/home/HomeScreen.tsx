import * as React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import format from "date-fns/format";
import CustomCard from "../../base/customCard/CustomCard";
import UserContext from "../../contexts/UserContext";
import EmptyState from "../../base/emptyState/EmptyState";
import NoData from "../../../assets/svg/no-data.svg";
import { Mode } from "../../types/types";
import { widthSize, heightSize } from "../../themes/sizes";
import { getGreetingText, getModeHistoryText } from "../../utils/utils";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  greeting: {
    fontSize: widthSize.l,
    marginVertical: heightSize.s,
    marginLeft: widthSize.m / 2,
  },
  modeText: {
    fontSize: widthSize.s,
    marginLeft: widthSize.m / 2,
  },
  text: {
    marginVertical: heightSize.s / 3,
    fontSize: widthSize.s,
  },
  button: {
    width: widthSize.xl * 5,
    height: heightSize.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    alignItems: "center",
    paddingTop: heightSize.s / 3,
    textAlign: "auto",
  },
  card: {
    marginHorizontal: widthSize.m / 2,
  },
});

const HomeScreen: React.FC<null> = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = React.useContext(UserContext);

  const date = new Date();
  const time = date.toTimeString().split(" ")[0];
  const [hours, minutes, seconds] = time.split(":");

  const { firstName, lastName, email, modes } = user;
  const greetingText = getGreetingText(parseInt(hours));
  let len = 0;
  if (modes) {
    len = modes.length > 5 ? modes.length - 5 : modes.length;
  }
  let recentResults = [] as Mode[];

  if (len != 0) {
    recentResults = len < 5 ? modes : modes.slice(len);
  }
  const modeHistoryText = getModeHistoryText(recentResults?.length);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={{ ...styles.greeting, color: theme.colors.text }}>
        {`${greetingText}, ${firstName} ${lastName}`}
      </Text>
      <View>
        {recentResults.length ? (
          <>
            <Text style={{ ...styles.modeText, color: theme.colors.text }}>
              {`${modeHistoryText}`}
            </Text>
            <View>
              {recentResults.map((recentResult) => {
                const { modeTopic, modeType, timestamp, level, id } =
                  recentResult;
                const date = format(Date.parse(timestamp), "PPPPpp");
                return (
                  <CustomCard
                    key={id}
                    title={`${modeTopic} ${modeType}: Level ${level} `}
                    subtitle={`Finished on ${date}`}
                    titleStyle={styles.title}
                    elevation={5}
                    style={styles.card}
                  />
                );
              })}
            </View>
          </>
        ) : (
          <EmptyState
            emptyStateText={"Want to try something new?"}
            buttonTitle={"Go to Topics"}
            image={<NoData height={120} width={120} fillOpacity={0.7} />}
            onPress={() => {
              navigation.navigate("Topics");
            }}
            buttonStyle={styles.button}
            textStyle={{ ...styles.text, color: theme.colors.text }}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
