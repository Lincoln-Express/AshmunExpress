import * as React from "react";
import { Dispatch, Quiz, ActionType, QuizAction } from "../../types/types";

const initialState = {
  id: 0,
  quizType: "",
  correctAnswersCount: 0,
  numberOfQuestions: 0,
  timeStamp: "",
  quizSessionHistory: [],
};
const QuizStateContext = React.createContext({} as Quiz);

const QuizDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

export const useQuizState = () => {
  const context = React.useContext(QuizStateContext);
  return context;
};

export const useQuizDispatch = () => {
  const context = React.useContext(QuizDispatchContext);
  return context;
};

const reducer = (state: Quiz, action: QuizAction): Quiz => {
  if (action.type === ActionType.INCREMENT_SCORE) {
    return {
      ...state,
      correctAnswersCount: state.correctAnswersCount + 1,
    };
  }

  if (action.type === ActionType.ADD_QUIZ_SESSION) {
    const { quizSessionHistory } = state;

    quizSessionHistory.push(action.payload);
    return {
      ...state,
      quizSessionHistory,
    };
  }

  if (action.type === ActionType.UPDATE_QUIZ) {
    return {
      ...state,
      ...action.payload,
    };
  }

  if (action.type === ActionType.RESET_QUIZ) {
    return initialState;
  }

  return state;
};

interface QuizProviderProps {
  children: React.ReactNode;
}
const QuizProvider: React.FC<QuizProviderProps> = ({
  children,
}: QuizProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <QuizStateContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizStateContext.Provider>
  );
};

export default QuizProvider;
