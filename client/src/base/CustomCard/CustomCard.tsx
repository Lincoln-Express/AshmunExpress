import * as React from "react";
import { StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderRadius: 10,
    marginVertical: 10,
    height: 72,
  },
});

interface CustomCardProps {
  title: string;
  titleStyle?: Record<string, unknown>;
  subtitle?: string;
  left?: () => JSX.Element;
  right?: () => JSX.Element;
  paragraph?: string;
  elevation?: number;
  onPress: () => void;
  style?: Record<string, unknown>;
}

const CustomCard: React.FC<CustomCardProps> = (props: CustomCardProps) => {
  const {
    title,
    subtitle,
    right,
    paragraph,
    elevation,
    onPress,
    left,
    style,
    titleStyle,
  } = props;

  return (
    <Card
      elevation={elevation}
      onPress={onPress}
      style={{ ...styles.container, ...style }}
    >
      <Card.Title
        title={title}
        subtitle={subtitle}
        right={right}
        left={left}
        style={titleStyle}
      />
      <Card.Content>
        <Paragraph>{paragraph}</Paragraph>
      </Card.Content>
    </Card>
  );
};

CustomCard.defaultProps = {
  subtitle: "",
  elevation: 0,
  paragraph: "",
  right: undefined,
  left: undefined,
  style: {},
  titleStyle: {},
};

export default CustomCard;
