import * as React from "react";
import { useTheme } from "react-native-paper";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 20,
    borderRadius: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "400",
    color: "#273A7F",
  },
});

interface LoadingProps {
  loading: boolean;
}
const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
  const { loading } = props;
  if (!loading) {
    return <View />;
  }
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator color="#273A7F" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

export default Loading;
