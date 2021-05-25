import * as React from "react";
import { ScrollView, Text, StyleSheet, View } from "react-native";
import {
  StackActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import shuffle from "lodash/shuffle";
import Loading from "../../base/loading/Loading";
import useFetch from "../../hooks/useFetch/useFetch";
import FilledButton from "../../base/filledButton/FilledButton";
import { getEndIndex } from "../../utils/utils";
import {
  useModeDispatch,
  useModeState,
} from "../../providers/modeProvider/ModeProvider";
import { ActionType } from "../../types/types";
import EmptyState from "../../base/emptyState/EmptyState";
import Empty from "../../../assets/svg/empty.svg";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: heightSize.l / 3,
  },
  outerContainer: {
    flex: 1,
    justifyContent: "center",
  },

  readyText: {
    fontSize: widthSize.m,
    textAlign: "center",
  },
  secondButton: {
    backgroundColor: "#F5F5F5",
    borderWidth: widthSize.s / 7.5,
    borderColor: "#273A8F",
  },
  secondButtonText: {
    color: "#273A8F",
  },
  text: {
    textAlign: "center",
    fontSize: widthSize.s * 2.4,
  },
  emptyStateButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const ModePenultimateScreen: React.FC<null> = (): JSX.Element => {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { topic, section, mode, level } = route.params;
  const url = `${mode.toLowerCase()}/${level}/section/${section}`;
  const modeState = useModeState();
  const currModeObject = Object.freeze({
    ...modeState,
    modeSection: section,
    modeTopic: topic,
    level,
  });

  const modeDispatch = useModeDispatch()!;
  React.useEffect(() => {
    modeDispatch({ type: ActionType.UPDATE_MODE, payload: currModeObject });
  }, []);

  const { isError, isLoading, data } = useFetch(url);

  if (data !== undefined) {
    if (data.length === 0) {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={{ ...styles.text, color: theme.colors.text }}>
            There are no questions for this section for now.
          </Text>
        </ScrollView>
      );
    }
    const shuffledArray = shuffle(data);
    const len = shuffledArray.length;
    const endIndex = getEndIndex(len);
    const questions = shuffledArray.slice(0, endIndex);
    return (
      <ScrollView contentContainerStyle={styles.outerContainer}>
        <Text style={{ ...styles.readyText, color: theme.colors.text }}>
          Are you ready ?
        </Text>
        <View style={styles.innerContainer}>
          <FilledButton
            title="Not yet"
            onPress={() => {
              navigation.goBack();
            }}
          />

          <FilledButton
            title="Get Started"
            onPress={() => {
              navigation.navigate(`${mode}`, {
                questions,
                url,
                mode,
                ...route.params,
              });
            }}
            buttonStyle={styles.secondButton}
            textStyle={styles.secondButtonText}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && (
        <Loading
          loading={isLoading}
          imageSource={require("../../../assets/json-animations/waiting-for-data.json")}
        />
      )}
      {isError && (
        <EmptyState
          emptyStateText={"Failed to load"}
          textStyle={{ ...styles.text, color: theme.colors.text }}
          image={<Empty height={120} width={120} />}
          buttonTitle={"Go back home"}
          onPress={() => {
            navigation.dispatch(StackActions.popToTop());
            navigation.navigate("Home");
          }}
          buttonStyle={styles.emptyStateButton}
        />
      )}
    </ScrollView>
  );
};

export default ModePenultimateScreen;
