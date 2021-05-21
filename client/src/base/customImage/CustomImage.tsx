import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});

interface CustomImageProps {
  image: string;
}
const CustomImage: React.FC<CustomImageProps> = (props: CustomImageProps) => {
  const { image } = props;

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} />
    </View>
  );
};

export default CustomImage;
