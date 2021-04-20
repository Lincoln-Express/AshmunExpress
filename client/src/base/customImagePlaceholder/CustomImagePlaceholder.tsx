import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#303030",
  },
});
interface CustomImagePlaceholderProps {
  imageSize?: number;
  image: any;
  style?: Record<string, unknown>;
}

const CustomImagePlaceholder: React.FC<CustomImagePlaceholderProps> = (
  props: CustomImagePlaceholderProps,
) => {
  const { image, imageSize, style } = props;

  return (
    <View style={style}>
      <Avatar.Image
        size={imageSize}
        source={{ uri: image }}
        style={styles.container}
      />
    </View>
  );
};

export default CustomImagePlaceholder;

CustomImagePlaceholder.defaultProps = {
  imageSize: 64,
};
