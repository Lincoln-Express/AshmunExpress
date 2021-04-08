import { QuizHelperType } from "../types/types";

const QuizHelper = (): QuizHelperType => {
  let counter = 0;
  const canGoBack = (quizType: string) => {
    return quizType === "Example" || quizType === "Tutorial";
  };

  const getAnswers = (questionObject) => {
    const result: Array<string> = [];

    Object.entries(questionObject).forEach(([key, value]) => {
      if (key.includes("option") && typeof value === "string") {
        result.push(value);
      }
    });

    return result;
  };

  const getCounter = () => {
    return counter;
  };

  const getQuestionObject = (questions: Array<Record<string, any>>) => {
    return questions[counter];
  };

  const getResultReview = (
    totalQuestions: number,
    correctAnswersCount: number,
    lowerQuartile: number,
    middleQuartile: number,
    upperQuartile: number,
  ): string => {
    if (correctAnswersCount <= lowerQuartile) {
      return "Not good enough!";
    }
    if (
      correctAnswersCount > lowerQuartile &&
      correctAnswersCount <= middleQuartile
    ) {
      return "You can do better!";
    }
    if (
      correctAnswersCount > middleQuartile &&
      correctAnswersCount <= upperQuartile
    ) {
      return "Good Job!";
    }
    if (correctAnswersCount === totalQuestions) {
      return "Perfect!";
    }
    return "Awesome!";
  };

  const hasFinishedQuiz = (questionsLength: number) => {
    return counter + 1 === questionsLength;
  };

  const isCorrect = (
    questionObject: Record<string, any>,
    possibleAnswer: string,
  ) => {
    const { answer } = questionObject;
    if (answer === possibleAnswer) {
      return true;
    }

    return false;
  };

  const moveToNextQuestion = () => {
    counter += 1;
  };

  const resetCounter = () => {
    counter = 0;
  };

  return {
    canGoBack,
    getAnswers,
    getCounter,
    getQuestionObject,
    getResultReview,
    hasFinishedQuiz,
    isCorrect,
    moveToNextQuestion,
    resetCounter,
  };
};

export default QuizHelper;
