export type ModeHelperType = {
  canGoBack: (modeType: string) => boolean;
  isCorrect: (
    questionObject: Record<string, any>,
    buttonValue: string,
  ) => boolean;
  getAnswers: (questionObject: Record<string, any>) => Array<string>;
  getCounter: () => number;
  getQuestionObject: (
    questions: Array<Record<string, any>>,
  ) => Record<string, any>;
  hasFinishedMode: (questionsLength: number) => boolean;
  moveToNextQuestion: () => void;
  resetCounter: () => void;
};

export enum ActionType {
  INCREMENT_SCORE = "INCREMENT_SCORE",
  ADD_MODE_SESSION = "ADD_MODE_SESSION",
  ADD_MODE = "ADD_MODE",
  SET_USER = "SET_USER",
  DELETE_USER = "DELETE_USER",
  SET_LOADING = "SET_LOADING",
  UPDATE_MODE = "UPDATE_MODE",
  RESET_MODE = "RESET_MODE",
  UPDATE_MODE_SESSION = "UPDATE_MODE_SESSION",
  RESET_MODE_SESSION = "RESET_MODE_SESSION",
  SIGN_IN = "SIGN_IN",
  SIGN_OUT = "SIGN_OUT",
}

export type AuthAction =
  | { type: ActionType.SIGN_IN; payload: User }
  | { type: ActionType.SIGN_OUT }
  | {
      type: ActionType.SET_LOADING;
    };

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  appearance: Appearance;
  modes: Mode[];
};

export type UserAction =
  | { type: ActionType.SET_USER; payload: User }
  | { type: ActionType.DELETE_USER }
  | { type: ActionType.ADD_MODE; payload: Mode };

export type ModeAction =
  | { type: ActionType.INCREMENT_SCORE }
  | { type: ActionType.ADD_MODE_SESSION; payload: ModeSession }
  | { type: ActionType.UPDATE_MODE; payload: Mode }
  | { type: ActionType.RESET_MODE };

export type ModeSessionAction =
  | {
      type: ActionType.UPDATE_MODE_SESSION;
      payload: ModeSession;
    }
  | { type: ActionType.RESET_MODE_SESSION };

export type Mode = {
  userId: number;
  id: number;
  modeType: string;
  modeTopic: string;
  modeSection: string;
  level: number;
  correctAnswersCount: number;
  numberOfQuestions: number;
  timestamp: string;
  modeSessionHistory: ModeSession[];
};

export type ModeSession = {
  modeId: number;
  id: number;
  question: string;
  answer: string;
  explanation: string;
  userAnswer: string;
};

export type SessionState = {
  isSignedIn: boolean;
  isLoading: boolean;
  user: User;
};

export type Auth = {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
};

export type Dispatch = (action: any) => void;

export enum Appearance {
  DARK = "dark",
  LIGHT = "light",
}
