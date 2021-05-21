import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper/src/core/theming";
import CustomAnimation from "../customAnimation/CustomAnimation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

interface LoadingProps {
  loading: boolean;
  loadingText?: string;
  imageSource: any;
}
const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
  const theme = useTheme();
  const backgroundColor = theme.dark ? "#121212" : "#F5F5F5";

  const { loading, loadingText, imageSource } = props;
  if (!loading) {
    return null;
  }
  return (
    <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
      <CustomAnimation imageSource={imageSource} text={loadingText} />
    </View>
  );
};

export default Loading;
