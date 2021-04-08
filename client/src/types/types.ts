export type QuizHelperType = {
  canGoBack: (quizType: string) => boolean;
  isCorrect: (
    questionObject: Record<string, any>,
    buttonValue: string,
  ) => boolean;
  getAnswers: (questionObject: Record<string, any>) => Array<string>;
  getCounter: () => number;
  getQuestionObject: (
    questions: Array<Record<string, any>>,
  ) => Record<string, any>;
  getResultReview: (
    totalQuestions: number,
    correctChoices: number,
    lowerQuartile: number,
    middleQuartile: number,
    upperQuartile: number,
  ) => string;
  hasFinishedQuiz: (questionsLength: number) => boolean;
  moveToNextQuestion: () => void;
  resetCounter: () => void;
};

export enum ActionType {
  INCREMENT_SCORE = "INCREMENT_SCORE",
  ADD_QUIZ_SESSION = "ADD_QUIZ_SESSION",
  ADD_QUIZ = "ADD_QUIZ",
  SET_USER = "SET_USER",
  DELETE_USER = "DELETE_USER",
  SET_LOADING = "SET_LOADING",
  UPDATE_QUIZ = "UPDATE_QUIZ",
  RESET_QUIZ = "RESET_QUIZ",
  UPDATE_QUIZ_SESSION = "UPDATE_QUIZ_SESSION",
  RESET_QUIZ_SESSION = "RESET_QUIZ_SESSION",
}

export type AuthAction =
  | { type: ActionType.SET_USER; payload: User | null }
  | { type: ActionType.DELETE_USER }
  | {
      type: ActionType.SET_LOADING;
      payload: User | null;
    };

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  appearance: Appearance;
  showNotifications: boolean;
  quizzes: Quiz[];
};

export type UserAction =
  | { type: ActionType.SET_USER; payload: User | null }
  | { type: ActionType.ADD_QUIZ; payload: Quiz };

export type QuizAction =
  | { type: ActionType.INCREMENT_SCORE }
  | { type: ActionType.ADD_QUIZ_SESSION; payload: QuizSession }
  | { type: ActionType.UPDATE_QUIZ; payload: Quiz }
  | { type: ActionType.RESET_QUIZ };

export type QuizSessionAction =
  | {
      type: ActionType.UPDATE_QUIZ_SESSION;
      payload: QuizSession;
    }
  | { type: ActionType.RESET_QUIZ_SESSION };

export type Quiz = {
  id: number;
  quizType: string;
  correctAnswersCount: number;
  numberOfQuestions: number;
  timeStamp: string;
  quizSessionHistory: QuizSession[];
};

export type QuizSession = {
  id: number;
  question: string;
  answer: string;
  explanation: string;
  userAnswer: string;
};

export type SessionState = {
  user: User | null;
  isLoading: boolean;
};

export type Auth = {
  auth: any;
  state: SessionState;
};

export type Dispatch = (action: any) => void;

export enum Appearance {
  DARK = "dark",
  LIGHT = "light",
}

export type Picture = {
  title: string;
  description: string;
  file: () => void;
};
