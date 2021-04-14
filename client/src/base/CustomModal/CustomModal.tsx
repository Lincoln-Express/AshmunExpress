import React, { useState } from "react";
import { Modal, Portal, Divider, Paragraph, Title } from "react-native-paper";
import FilledButton from "../FilledButton/FilledButton";

interface CustomModalProps {
  content: string;
  title: string;
}

const CustomModal: React.FC<CustomModalProps> = (props: CustomModalProps) => {
  const { content, title } = props;
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal}>
        <Title>{title}</Title>
        <Divider />
        <Paragraph>{content}</Paragraph>
      </Modal>
      <FilledButton title="check answer" handlePress={showModal} />
    </Portal>
  );
};

export default CustomModal;
