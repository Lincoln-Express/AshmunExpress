import * as React from "react";

const AnswerButtonContext = React.createContext({
  disabled: false,
  toggleDisability: (hasBeenPressed: boolean) => {},
});

export default AnswerButtonContext;
