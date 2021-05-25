import * as React from "react";
import { Dispatch, Mode, ActionType, ModeAction } from "../../types/types";

const ModeStateContext = React.createContext({} as Mode);

const ModeDispatchContext =
  React.createContext<Dispatch | undefined>(undefined);

export const useModeState = () => {
  const context = React.useContext(ModeStateContext);
  return context;
};

export const useModeDispatch = () => {
  const context = React.useContext(ModeDispatchContext);
  return context;
};

const reducer = (state: Mode, action: ModeAction): Mode => {
  if (action.type === ActionType.INCREMENT_SCORE) {
    return {
      ...state,
      correctAnswersCount: state.correctAnswersCount + 1,
    };
  }

  if (action.type === ActionType.ADD_MODE_SESSION) {
    const { modeSessionHistory: modeSessionHistory } = state;

    modeSessionHistory.push(action.payload);
    return {
      ...state,
      modeSessionHistory: modeSessionHistory,
    };
  }

  if (action.type === ActionType.UPDATE_MODE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  if (action.type === ActionType.RESET_MODE) {
    return {} as Mode;
  }

  return state;
};

interface ModeProviderProps {
  children: React.ReactNode;
}
const ModeProvider: React.FC<ModeProviderProps> = ({
  children,
}: ModeProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, {} as Mode);

  return (
    <ModeStateContext.Provider value={state}>
      <ModeDispatchContext.Provider value={dispatch}>
        {children}
      </ModeDispatchContext.Provider>
    </ModeStateContext.Provider>
  );
};

export default ModeProvider;
