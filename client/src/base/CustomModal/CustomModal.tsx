import * as React from "react";
import { Modal, Portal, Paragraph, Title } from "react-native-paper";
import { View } from "react-native";

interface CustomModalProps {
  content: string;
  title: string;
  visible: boolean;
  actionButtons?: Array<JSX.Element>;
}

const CustomModal: React.FC<CustomModalProps> = (props: CustomModalProps) => {
  const { content, title, actionButtons, visible } = props;

  return (
    <Portal>
      <Modal visible={visible} dismissable>
        <Title>{title}</Title>
        <Paragraph>{content}</Paragraph>
        {actionButtons?.map((actionButton) => (
          <View>{actionButton}</View>
        ))}
      </Modal>
    </Portal>
  );
};

CustomModal.defaultProps = {
  actionButtons: undefined,
};
export default CustomModal;
