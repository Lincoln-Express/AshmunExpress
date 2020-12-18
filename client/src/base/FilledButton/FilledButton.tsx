import * as React from "react";
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
  text: {
    color: "#fff",
    fontSize: 16,
  },
});

interface FilledButtonProps {
  title: string;
  handlePress: () => void;
  style?: Record<string, unknown>;
}

const FilledButton: React.FC<FilledButtonProps> = (
  props: FilledButtonProps,
) => {
  const { title, handlePress, style } = props;
  const titleValue = Platform.OS === "ios" ? title : title.toUpperCase();

  return Platform.OS === "ios" ? (
    <TouchableHighlight
      style={{ ...styles.container, ...style }}
      onPress={handlePress}
    >
      <Text style={styles.text}>{titleValue}</Text>
    </TouchableHighlight>
  ) : (
    <TouchableNativeFeedback onPress={handlePress}>
      <View style={{ ...styles.container, ...style }}>
        <Text style={styles.text}>{titleValue}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

FilledButton.defaultProps = {
  style: {},
};
export default FilledButton;
