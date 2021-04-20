import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "react-native-paper/src/core/theming";

const styles = StyleSheet.create({
  container: { position: "absolute", top: 50, right: 20 },
});

export interface IconButtonProps {
  name: string;
  onPress?: () => void;
  style?: Record<string, unknown>;
  size?: number;
  color?: string;
}

const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  const { name, onPress, style, size, color } = props;
  const nameValue = Platform.OS === "ios" ? `ios-${name}` : `md-${name}`;
  const theme = useTheme();
  const themeColor = theme.dark ? "#F57C00" : "#273A7F";

  const handleOnPress = () => {
    requestAnimationFrame(() => {
      if (!onPress) {
        return;
      }

      return onPress();
    });
  };
  return Platform.OS === "ios" ? (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={handleOnPress}
    >
      <Ionicons name={nameValue} size={size} color={color || themeColor} />
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback onPress={handleOnPress}>
      <View style={{ ...styles.container, ...style }}>
        <Ionicons name={nameValue} size={size} color={color || themeColor} />
      </View>
    </TouchableNativeFeedback>
  );
};

IconButton.defaultProps = {
  size: 32,
  onPress: undefined,
  style: {},
  color: "",
};
export default IconButton;
