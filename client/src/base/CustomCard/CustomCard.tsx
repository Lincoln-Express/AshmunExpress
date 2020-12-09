/* eslint-disable react-native/no-inline-styles */
/* eslint-disable global-require */
/* eslint-disable react/jsx-one-expression-per-line */
import * as React from "react";
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
  source: any;
  elevation?: number;
  onPress: () => void;
  key?: string;
}

// TODO: remove the key prop, make source prop optional, and add size prop, make it optional as well
const CustomCard: React.FC<CustomCardProps> = (props: CustomCardProps) => {
  const {
    title,
    subtitle,
    right,
    paragraph,
    source,
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
      <Card.Cover source={source} />
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
