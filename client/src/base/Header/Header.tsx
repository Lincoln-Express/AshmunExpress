import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  text: {
    fontSize: widthSize.m,
    color: "#273A7F",
    marginBottom: heightSize.s / 3,
  },
});

interface HeaderProps {
  children: string;
  style?: Record<string, unknown>;
}
const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const theme = useTheme();
  const { children, style } = props;
  return (
    <Text style={{ ...styles.text, ...style, color: theme.colors.text }}>
      {children}
    </Text>
  );
};

Header.defaultProps = {
  style: {},
};
export default Header;
