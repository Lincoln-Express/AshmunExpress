/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { View } from "react-native";
import useSWR from "swr";
import Loading from "../../base/Loading/Loading";
import fetcher from "../../utils/fetcher/fetcher";
import BASE_URL from "../../config/index";
import resolveQuizData from "../../utils/resolveQuizData/resolveQuizData";

const QuizScreen = (): JSX.Element => {
  const { data, error } = useSWR(`${BASE_URL}/topics`, fetcher);

  return (
    <View>
      {error && <View>{error.info}</View>}
      {!data && <Loading loading />}
      {data && <View>{resolveQuizData(data)}</View>}
    </View>
  );
};

export default QuizScreen;
