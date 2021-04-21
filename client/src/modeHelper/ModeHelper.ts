import { ModeHelperType } from "../types/types";

const ModeHelper = (): ModeHelperType => {
  let counter = 0;
  const canGoBack = (modeType: string) => {
    return modeType === "Example" || modeType === "Tutorial";
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

  const hasFinishedMode = (questionsLength: number) => {
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
    hasFinishedMode,
    isCorrect,
    moveToNextQuestion,
    resetCounter,
  };
};

export default ModeHelper;
