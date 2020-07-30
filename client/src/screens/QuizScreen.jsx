/* eslint-disable react/jsx-fragments */
import React, { useState, Fragment } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import FilledButton from '../components/FilledButton';

const QuizScreen = () => {
  const [count, setCount] = useState(0);

  // should fetch data from the network, probably in an array format

  return (
    <Fragment>
      <View>
        <Text>QuestionTitle</Text>
        <FilledButton>Option A</FilledButton>
        <FilledButton>Option B</FilledButton>
        <FilledButton>Option C</FilledButton>
        <FilledButton>Option D</FilledButton>
      </View>
    </Fragment>
  );
};

export default QuizScreen;
