import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "../icon/Icon";
import CustomImagePlaceholder from "../customImagePlaceholder/CustomImagePlaceholder";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  outerContainer: {
    flex: 0,
    flexDirection: "row",
    margin: widthSize.l / 3,
    justifyContent: "center",
  },
  innerContainer: {
    flexDirection: "column",
  },

  textContainer: {
    marginLeft: widthSize.l / 10,
  },
  primaryText: {
    fontSize: widthSize.xl / 2,
  },
  secondaryText: {
    opacity: 0.7,
  },
  image: {
    top: heightSize.s / 3,
    right: 0,
    left: widthSize.xl,
  },
});

interface CustomUserAvatarProps {
  name: string;
  secondaryDetail?: string;
  uri: string;
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
    uri,
    onPress,
    nameStyle,
    secondaryDetailStyle,
  } = props;
  const theme = useTheme();

  return (
    <View style={styles.outerContainer}>
      <View>
        <CustomImagePlaceholder imageSize={96} uri={uri} />
        <Icon onPress={onPress} name="camera" style={styles.image} size={24} />
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
