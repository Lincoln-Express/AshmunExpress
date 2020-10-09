/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { View } from 'react-native';
import useSWR from 'swr';
import Loading from '../../base/Loading/Loading';
import fetcher from '../../utils/fetcher/fetcher';
import BASE_URL from '../../config/index';
import mergeQuizData from '../../utils/mergeQuizData/mergeQuizData';
import FilledButton from '../../base/FilledButton/FilledButton';

const QuizScreen = (): JSX.Element => {
  const { data, error } = useSWR(`${BASE_URL}/topics`, fetcher);
  const result = mergeQuizData(data);
  const topic = (title: string, handlePress: () => any) => {
    return <FilledButton title={title} handlePress={handlePress} />;
  };

  return (
    <View>
      {error && <View>{error.info}</View>}
      {!data && <Loading loading />}
      {data && (
        <View>
          {
            // add section list here.
          }
        </View>
      )}
    </View>
  );
};

export default QuizScreen;
