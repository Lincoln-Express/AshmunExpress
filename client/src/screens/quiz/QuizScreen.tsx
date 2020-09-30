/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { View } from "react-native";
import useSWR from "swr";
import Loading from "../../base/Loading/Loading";
import fetcher from "../../utils/fetcher";
import BASE_URL from "../../config/index";

// split topics and subtopics
function resolveData(data: Array<{ topic: string; section: string }>) {
  return data;
}

const QuizScreen = (): JSX.Element => {
  const { data, error } = useSWR(`${BASE_URL}/topics`, fetcher);

  return (
    <View>
      {error && <View>{error.info}</View>}
      {!data && <Loading loading />}
      {data && <View>{resolveData(data)}</View>}
    </View>
  );
};

export default QuizScreen;
