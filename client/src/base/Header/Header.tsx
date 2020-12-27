import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: "#273A7F",
    marginBottom: 10,
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
