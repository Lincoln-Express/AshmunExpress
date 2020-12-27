import * as React from "react";
import ProgressBar from "react-native-paper/src/components/ProgressBar";

interface CustomProgressBarProps {
  progress: number;
  color: string;
}

const CustomProgressBar: React.FC<CustomProgressBarProps> = (
  props: CustomProgressBarProps,
) => {
  const { progress, color } = props;

  return <ProgressBar progress={progress} color={color} />;
};

export default CustomProgressBar;
