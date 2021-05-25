import * as React from "react";
import {
  Dispatch,
  ActionType,
  ModeSessionAction,
  ModeSession,
} from "../../types/types";

const ModeSessionStateContext = React.createContext({} as ModeSession);

const ModeSessionDispatchContext =
  React.createContext<Dispatch | undefined>(undefined);

export const useModeSessionState = () => {
  const context = React.useContext(ModeSessionStateContext);
  return context;
};

export const useModeSessionDispatch = () => {
  const context = React.useContext(ModeSessionDispatchContext);
  return context;
};

const reducer = (
  state: ModeSession,
  action: ModeSessionAction,
): ModeSession => {
  if (action.type === ActionType.UPDATE_MODE_SESSION) {
    return {
      ...state,
      ...action.payload,
    };
  }

  if (action.type === ActionType.RESET_MODE_SESSION) {
    return {} as ModeSession;
  }

  return state;
};

interface ModeSessionProviderProps {
  children: React.ReactNode;
}
const ModeSessionProvider: React.FC<ModeSessionProviderProps> = ({
  children,
}: ModeSessionProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, {} as ModeSession);

  return (
    <ModeSessionStateContext.Provider value={state}>
      <ModeSessionDispatchContext.Provider value={dispatch}>
        {children}
      </ModeSessionDispatchContext.Provider>
    </ModeSessionStateContext.Provider>
  );
};

export default ModeSessionProvider;
