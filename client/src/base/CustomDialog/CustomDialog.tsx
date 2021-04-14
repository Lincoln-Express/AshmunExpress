import React, { useState } from "react";
import { View } from "react-native";
import { Paragraph, Dialog, Portal } from "react-native-paper";
import TextButton from "../TextButton/TextButton";

interface CustomDialogProps {
  showDialogText: string;
  content: string;
  actionButtons: Array<JSX.Element>;
}
const CustomDialog: React.FC<CustomDialogProps> = (
  props: CustomDialogProps,
) => {
  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const { showDialogText, content, actionButtons } = props;

  return (
    <View>
      <TextButton title={showDialogText} handlePress={showDialog} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Paragraph>{content}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            {actionButtons.map((actionButton) => actionButton)}
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CustomDialog;
