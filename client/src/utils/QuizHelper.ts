import * as React from "react";

type QuizHelperReturnType = {
  counter: number;
  canGoBack: (quizType: string) => boolean;
  checkValidAnswer: (
    questionObject: Record<string, any>,
    buttonValue: string,
  ) => boolean;
  getCorrectAnswersCount: () => number;
  getQuestionObject: (questions: Record<string, any>[]) => Record<string, any>;
  hasFinishedQuiz: (questionsLength: number) => boolean;
  moveToNextQuiz: () => void;
};

const QuizHelper = (): any => {
  // const [counter, setCounter] = React.useState(0);
  // const [correctAnswer, setCorrectAnswer] = React.useState(0);
  // const canGoBack = (quizType: string) => {
  //   return quizType === "Example" || quizType === "Tutorial";
  // };
  // const checkValidAnswer = (
  //   questionObject: Record<string, any>,
  //   buttonValue: string,
  // ) => {
  //   const { answer } = questionObject;
  //   if (answer === buttonValue) {
  //     setCorrectAnswer((ans) => ans + 1);
  //     return true;
  //   }
  //   return false;
  // };
  // const getCorrectAnswersCount = () => {
  //   return correctAnswer;
  // };
  // const getQuestionObject = (questions: Record<string, any>[]) => {
  //   return questions[counter];
  // };
  // const hasFinishedQuiz = (questionsLength: number) => {
  //   return counter > questionsLength;
  // };
  // const moveToNextQuiz = () => setCounter((count) => count + 1);
  // // TODO: Can show modal
  // return {
  //   counter,
  //   canGoBack,
  //   checkValidAnswer,
  //   getCorrectAnswersCount,
  //   getQuestionObject,
  //   hasFinishedQuiz,
  //   moveToNextQuiz,
  // };
};

export default QuizHelper;
