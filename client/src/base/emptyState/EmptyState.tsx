import * as React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import FilledButton from "../filledButton/FilledButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginVertical: 10,
  },
  image: {
    marginTop: 20,
  },
});
interface EmptyStateProps {
  image: JSX.Element;
  emptyStateText: string;
  onPress: () => void;
  buttonTitle: string;
  buttonStyle?: Record<string, unknown>;
  textStyle?: Record<string, unknown>;
  style?: Record<string, unknown>;
  imageStyle?: Record<string, unknown>;
}

const EmptyState: React.FC<EmptyStateProps> = (props: EmptyStateProps) => {
  const {
    image,
    emptyStateText,
    buttonTitle,
    onPress,
    buttonStyle,
    style,
    textStyle,
    imageStyle,
  } = props;
  return (
    <View style={{ ...styles.container, ...style }}>
      <View style={{ ...styles.image, ...imageStyle }}>{image}</View>

      <Text style={{ ...styles.text, ...textStyle }}>{emptyStateText}</Text>
      <FilledButton
        onPress={onPress}
        title={buttonTitle}
        buttonStyle={buttonStyle}
      />
    </View>
  );
};

export default EmptyState;
