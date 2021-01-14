import * as React from "react";
import { ProgressBar, useTheme } from "react-native-paper";
import ThemeContext from "../../contexts/ThemeContext";

interface CustomProgressBarProps {
  progress: number;
  style?: Record<string, any>;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = (
  props: CustomProgressBarProps,
) => {
  const { progress, style } = props;
  const theme = useTheme();
  const isThemeDark = React.useContext(ThemeContext);
  return (
    <ProgressBar
      progress={progress}
      color={isThemeDark ? theme.colors.primary : theme.colors.accent}
      style={style}
    />
  );
};

export default CustomProgressBar;

CustomProgressBar.defaultProps = {
  style: {},
};
