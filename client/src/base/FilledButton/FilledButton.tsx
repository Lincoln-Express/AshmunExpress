import React from "react";
import {
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  Text,
  Platform,
  View,
} from "react-native";
import buttonElevationStyle from "../../utils/buttonElevation";

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: buttonElevationStyle.ios,
      },
      android: {
        backgroundColor: buttonElevationStyle.android.color,
        elevation: buttonElevationStyle.android.elevation,
      },
    }),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
    marginVertical: 15,
  },
  textStyle: {
    color: "#fff",
    fontSize: 16,
  },
});

interface FilledButtonProps {
  title: any;
  handlePress: () => any;
}

const FilledButton: React.FC<FilledButtonProps> = (
  props: FilledButtonProps,
) => {
  const { title, handlePress } = props;
  const titleValue = Platform.OS === "ios" ? title : title.toUpperCase();

  return Platform.OS === "ios" ? (
    <TouchableHighlight style={styles.container} onPress={handlePress}>
      <Text style={styles.textStyle}>{titleValue}</Text>
    </TouchableHighlight>
  ) : (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>{titleValue}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default FilledButton;
