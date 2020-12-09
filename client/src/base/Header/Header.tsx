/* eslint-disable react/require-default-props */
import * as React from "react";
import { Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
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
  const { children, style } = props;
  return <Text style={style || styles.container}>{children}</Text>;
};

export default Header;
