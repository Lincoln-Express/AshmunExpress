import * as React from "react";
import { Switch } from "react-native";

interface CustomSwitchProps {
  onPress: () => void;
  trackColor: Array<string>;
  value: boolean;
}

const CustomSwitch: React.FC<CustomSwitchProps> = (
  props: CustomSwitchProps,
) => {
  const { onPress, trackColor, value } = props;

  return (
    <Switch
      onValueChange={onPress}
      trackColor={{ false: trackColor[0], true: trackColor[1] }}
      thumbColor={value ? "#273A7F" : "#F57C00"}
      value={value}
    />
  );
};

export default CustomSwitch;
