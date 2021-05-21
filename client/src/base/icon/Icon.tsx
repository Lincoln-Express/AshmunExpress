import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useTheme } from "react-native-paper/src/core/theming";

const styles = StyleSheet.create({
  container: { position: "absolute", top: 50, right: 20 },
});

export interface IconProps {
  name: string;
  onPress?: () => void;
  style?: Record<string, unknown>;
  size?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = (props: IconProps) => {
  const { name, onPress, style, size, color } = props;
  const nameValue = Platform.OS === "ios" ? `ios-${name}` : `md-${name}`;
  const theme = useTheme();
  const themeColor = theme.dark ? "#F57C00" : "#273A7F";

  return Platform.OS === "ios" ? (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={onPress}
    >
      <Ionicons name={nameValue} size={size} color={color || themeColor} />
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={{ ...styles.container, ...style }}>
        <Ionicons name={nameValue} size={size} color={color || themeColor} />
      </View>
    </TouchableNativeFeedback>
  );
};

Icon.defaultProps = {
  size: 32,
  onPress: undefined,
  style: {},
  color: "",
};
export default Icon;
