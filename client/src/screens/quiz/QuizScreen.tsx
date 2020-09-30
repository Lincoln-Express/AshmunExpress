/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { View, Text } from "react-native";
import useSWR from "swr";
import Loading from "../../base/Loading/Loading";
import fetcher from "../../utils/fetcher";
import BASE_URL from "../../config/index";

// split topics and subtopics
function resolveData(
  data: Array<{ topic_name: string; section_name: string }>,
) {
  return data.map((d) => <Text> {d.topic_name} </Text>);
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
