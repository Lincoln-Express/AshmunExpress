import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: { position: "absolute", top: 50, right: 20 },
});

export interface IconButtonProps {
  name: string;
  onPress?: () => void;
  style?: Record<string, unknown>;
  size?: number;
  color: string;
}

const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  const { name, onPress, style, size, color } = props;
  const nameValue = Platform.OS === "ios" ? `ios-${name}` : `md-${name}`;

  return Platform.OS === "ios" ? (
    <TouchableOpacity
      style={{ ...styles.container, ...style }}
      onPress={onPress}
    >
      <Ionicons name={nameValue} size={size} color={color} />
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={{ ...styles.container, ...style }}>
        <Ionicons name={nameValue} size={size} color={color} />
      </View>
    </TouchableNativeFeedback>
  );
};

IconButton.defaultProps = {
  size: 32,
  onPress: undefined,
  style: {},
};
export default IconButton;
