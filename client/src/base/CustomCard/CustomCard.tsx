/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
});

interface CustomCardProps {
  title: string;
  subtitle?: string;
  right: () => JSX.Element;
  paragraph?: string;
  uri: string;
  elevation?: number;
  onPress: () => void;
  key?: string;
}

const CustomCard: React.FC<CustomCardProps> = (props: CustomCardProps) => {
  const {
    title,
    subtitle,
    right,
    paragraph,
    uri,
    elevation,
    onPress,
    key,
  } = props;

  return (
    <Card
      elevation={elevation}
      onPress={onPress}
      style={styles.container}
      testID={key}
    >
      <Card.Cover source={require("../../../assets/random.jpg")} />
      <Card.Title title={title} subtitle={subtitle} right={right} />
      <Card.Content>
        <Paragraph> {paragraph}</Paragraph>
      </Card.Content>
    </Card>
  );
};

CustomCard.defaultProps = {
  subtitle: "",
  elevation: 0,
  paragraph: "",
  key: "",
};

export default CustomCard;
