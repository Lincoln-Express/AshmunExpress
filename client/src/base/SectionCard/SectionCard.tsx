/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
import { Card, Paragraph } from "react-native-paper";

interface SectionCardProps {
  title: any;
  subtitle?: string;
  right: () => JSX.Element;
  paragraph?: string;
  uri?: string;
  elevation?: number;
  onPress: () => void;
}

const SectionCard: React.FC<SectionCardProps> = (
  props: SectionCardProps,
): JSX.Element => {
  const { title, subtitle, right, paragraph, uri, elevation, onPress } = props;
  return (
    <Card elevation={elevation} onPress={onPress}>
      <Card.Title title={title} subtitle={subtitle} right={right} />
      <Card.Cover source={{ uri }} />
      <Card.Content>
        {" "}
        <Paragraph> {paragraph}</Paragraph>
      </Card.Content>
    </Card>
  );
};

SectionCard.defaultProps = {
  subtitle: "",
  uri: "",
  elevation: 0,
  paragraph: "",
};
export default SectionCard;
