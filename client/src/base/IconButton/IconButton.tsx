import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {},
});

interface IconButtonProps {
  name: string;
  handlePress: () => any;
  style: any;
  size?: number;
}

const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  const { name, handlePress, style, size } = props;
  const nameValue = Platform.OS === "ios" ? `ios-${name}` : `md-${name}`;

  return Platform.OS === "ios" ? (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
      <Ionicons name={nameValue} size={size} color="#273A7F" />
    </TouchableOpacity>
  ) : (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={[styles.container, style]}>
        <Ionicons name={nameValue} size={size} color="#273A7F" />
      </View>
    </TouchableNativeFeedback>
  );
};

IconButton.defaultProps = {
  size: 32,
};
export default IconButton;
