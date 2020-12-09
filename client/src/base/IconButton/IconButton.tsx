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
  handlePress: () => void;
  style?: Record<string, unknown>;
  size?: number;
}

const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  const { name, handlePress, style, size } = props;
  const nameValue = Platform.OS === "ios" ? `ios-${name}` : `md-${name}`;

  return Platform.OS === "ios" ? (
    <TouchableOpacity style={style || styles.container} onPress={handlePress}>
      <Ionicons name={nameValue} size={size} color="#273A7F" />
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={style || styles.container}>
        <Ionicons name={nameValue} size={size} color="#273A7F" />
      </View>
    </TouchableNativeFeedback>
  );
};

IconButton.defaultProps = {
  size: 32,
};
export default IconButton;
