import * as React from "react";
import {
  Dispatch,
  ActionType,
  QuizSessionAction,
  QuizSession,
} from "../../types/types";

const initialState = {
  id: 0,
  question: "",
  answer: "",
  explanation: "",
  userAnswer: "",
};

const QuizSessionStateContext = React.createContext({} as QuizSession);

const QuizSessionDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
);

export const useQuizSessionState = () => {
  const context = React.useContext(QuizSessionStateContext);
  return context;
};

export const useQuizSessionDispatch = () => {
  const context = React.useContext(QuizSessionDispatchContext);
  return context;
};

const reducer = (
  state: QuizSession,
  action: QuizSessionAction,
): QuizSession => {
  if (action.type === ActionType.UPDATE_QUIZ_SESSION) {
    return {
      ...state,
      ...action.payload,
    };
  }

  if (action.type === ActionType.RESET_QUIZ_SESSION) {
    return initialState;
  }

  return state;
};

interface QuizSessionProviderProps {
  children: React.ReactNode;
}
const QuizProvider: React.FC<QuizSessionProviderProps> = ({
  children,
}: QuizSessionProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <QuizSessionStateContext.Provider value={state}>
      <QuizSessionDispatchContext.Provider value={dispatch}>
        {children}
      </QuizSessionDispatchContext.Provider>
    </QuizSessionStateContext.Provider>
  );
};

export default QuizProvider;
