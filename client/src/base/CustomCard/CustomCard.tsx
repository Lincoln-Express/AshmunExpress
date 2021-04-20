import * as React from "react";
import { StyleSheet } from "react-native";
import { Card, Paragraph } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderRadius: 10,
    marginVertical: 10,
  },
  paragraph: {
    marginVertical: 10,
    textAlign: "left",
  },
});

interface CustomCardProps {
  title: string;
  titleStyle?: Record<string, unknown>;
  subtitle?: string;
  left?: () => JSX.Element;
  right?: () => JSX.Element;
  paragraphs?: Array<string>;
  elevation?: number;
  onPress?: () => void;
  style?: Record<string, unknown>;
  subtitleNumberOfLines?: number;
}

const CustomCard: React.FC<CustomCardProps> = (props: CustomCardProps) => {
  const {
    title,
    subtitle,
    right,
    paragraphs,
    elevation,
    onPress,
    left,
    style,
    titleStyle,
    subtitleNumberOfLines,
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
        subtitleNumberOfLines={subtitleNumberOfLines}
      />
      <Card.Content>
        {paragraphs &&
          paragraphs.map((paragraph) => (
            <Paragraph style={styles.paragraph}>{paragraph}</Paragraph>
          ))}
      </Card.Content>
    </Card>
  );
};

CustomCard.defaultProps = {
  subtitle: "",
  elevation: 0,
  paragraphs: undefined,
  right: undefined,
  left: undefined,
  style: {},
  titleStyle: {},
};

export default CustomCard;
