type QuizHelperReturnType = {
  counter: number;
  canGoBack: (quizType: string) => boolean;
  checkValidAnswer: (
    questionObject: Record<string, any>,
    buttonValue: string,
  ) => boolean;
  getCorrectAnswersCount: () => number;
  getEndIndex: (len: number) => number;
  getQuestionObject: (questions: Record<string, any>[]) => Record<string, any>;
  getResultReview: (
    totalQuestions: number,
    correctChoices: number,
    lowerQuartile: number,
    middleQuartile: number,
    upperQuartile: number,
  ) => string;
  hasFinishedQuiz: (questionsLength: number) => boolean;
  moveToNextQuiz: () => void;
};

const QuizHelper = (): QuizHelperReturnType => {
  let counter = 0;
  let correctAnswer = 0;
  const canGoBack = (quizType: string) => {
    return quizType === "Example" || quizType === "Tutorial";
  };
  const checkValidAnswer = (
    questionObject: Record<string, any>,
    buttonValue: string,
  ) => {
    const { answer } = questionObject;
    if (answer === buttonValue) {
      correctAnswer += 1;
      return true;
    }
    return false;
  };
  const getCorrectAnswersCount = () => {
    return correctAnswer;
  };
  const getEndIndex = (len: number) => {
    if (len < 11) {
      return len + 1;
    }

    if (len > 20) {
      return 11;
    }

    return len / 2 + 1;
  };

  const getQuestionObject = (questions: Record<string, any>[]) => {
    return questions[counter];
  };

  const getResultReview = (
    totalQuestions: number,
    correctChoices: number,
    lowerQuartile: number,
    middleQuartile: number,
    upperQuartile: number,
  ): string => {
    if (correctChoices <= lowerQuartile) {
      return "Not Enough!";
    }
    if (correctChoices > lowerQuartile && correctChoices <= middleQuartile) {
      return "You can do better!";
    }
    if (correctChoices > middleQuartile && correctChoices <= upperQuartile) {
      return "Good Job!";
    }
    if (correctChoices === totalQuestions) {
      return "Perfect!";
    }
    return "Awesome!";
  };

  const hasFinishedQuiz = (questionsLength: number) => {
    return counter > questionsLength;
  };
  const moveToNextQuiz = () => {
    counter += 1;
  };
  // TODO: Can show modal

  return {
    counter,
    canGoBack,
    checkValidAnswer,
    getCorrectAnswersCount,
    getEndIndex,
    getQuestionObject,
    getResultReview,
    hasFinishedQuiz,
    moveToNextQuiz,
  };
};

export default QuizHelper;
