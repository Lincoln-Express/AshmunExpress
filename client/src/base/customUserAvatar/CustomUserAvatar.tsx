import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import IconButton from "../iconButton/IconButton";
import CustomImagePlaceholder from "../customImagePlaceholder/CustomImagePlaceholder";

const styles = StyleSheet.create({
  outerContainer: {
    flex: 0,
    flexDirection: "row",
    margin: 10,
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "column",
  },

  textContainer: {
    marginLeft: 3,
  },
  primaryText: {
    fontSize: 20,
  },
  secondaryText: {
    opacity: 0.7,
  },
  image: {
    top: 10,
    right: 0,
    left: 70,
  },
});

interface CustomUserAvatarProps {
  name: string;
  secondaryDetail?: string;
  image: any;
  onPress: () => void;
  miniIcon?: string;
  nameStyle?: Record<string, unknown>;
  secondaryDetailStyle?: Record<string, unknown>;
}

const CustomUserAvatar: React.FC<CustomUserAvatarProps> = (
  props: CustomUserAvatarProps,
) => {
  const {
    name,
    secondaryDetail,
    image,
    onPress,
    nameStyle,
    secondaryDetailStyle,
  } = props;
  const theme = useTheme();

  return (
    <View style={styles.outerContainer}>
      <View>
        <CustomImagePlaceholder imageSize={96} image={image} />
        <IconButton
          onPress={onPress}
          name="camera"
          style={styles.image}
          size={24}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.primaryText,
              ...nameStyle,
              color: theme.colors.text,
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              ...styles.secondaryText,
              ...secondaryDetailStyle,
              color: theme.colors.text,
            }}
          >
            {secondaryDetail}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomUserAvatar;
