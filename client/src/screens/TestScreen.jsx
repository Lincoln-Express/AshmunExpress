/* eslint-disable react/jsx-fragments */
import React, { useState, Fragment } from 'react';
import { View } from 'react-native';
import QuestionDescription from './QuestionDescription';
import FilledButton from '../components/FilledButton';

const TestScreen = (props, { navigation }) => {
  const { questions } = props;
  const { length } = questions;
  const [count, setCount] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  // code below should go into a function that is passed to a button called next
  //   if (count < length) {
  //     navigation.push('TestScreen');
  //     setCount((c) => c + 1);
  //   } else {
  //     navigation.push('QuizResultsScreen', {
  //       numberOfCorrectAnswers: correctAnswers,
  //       numberOfQuestions: length,
  //     });
  //   }

  return (
    <Fragment>
      {QuestionDescription(questions[count].question)}
      {/* <AnswerOptions question={questions[count]}/> */}
      <FilledButton
        title={questions[count].answer1}
        handlePress={() =>
          navigation.push('QuizList', { name: `level ${level}` })
        }
      />
      <FilledButton
        title={questions[count].answer2}
        handlePress={() =>
          navigation.push('QuizList', { name: `level ${level}` })
        }
      />
      <FilledButton
        title={questions[count].answer3}
        handlePress={() =>
          navigation.push('QuizList', { name: `level ${level}` })
        }
      />
      <FilledButton
        title={questions[count].answer4}
        handlePress={() =>
          navigation.push('QuizList', { name: `level ${level}` })
        }
      />
    </Fragment>
  );
};

export default TestScreen;
