/* eslint-disable react/jsx-fragments */
import React, { useState, useEffect } from 'react';
import {
  useRoute,
  useNavigation,
  NavigationContainer,
} from '@react-navigation/native';
import axios from 'axios';
import BASE_URL from '../config/index';
import TestScreen from './TestScreen';
// import QuizStackNavigator from '../navigators/QuizStackNavigator';

const QuizScreen = () => {
  const [questions, setQuestions] = useState([]);
  const route = useRoute();
  const { name } = route.params;
  const navigation = useNavigation();

  useEffect(async () => {
    await axios.post(`${BASE_URL}/${name}`).then((res) => {
      setQuestions(res.data);
    });
  }, []);

  if (name === 'Example') {
    // navigation.push('ExampleScreen');
    return <ExampleScreen questions={questions} />;
  }
  if (name === 'Practice') {
    return <PracticeScreen questions={questions} />;
  }
  if (name === 'Test') {
    return <TestScreen questions={questions} />;
  }

  return <TutorialScreen questions={questions} />;
};

export default QuizScreen;
