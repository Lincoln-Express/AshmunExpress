import * as React from "react";

const ScoreContext = React.createContext({
  correctAnswersCount: 0,
  increaseCorrectAnswersCount: (isCorrectAnswer: boolean) => {},
  reset: () => {},
});

export default ScoreContext;
