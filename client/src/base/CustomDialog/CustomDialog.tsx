import * as React from "react";
import { View } from "react-native";
import { Paragraph, Dialog, Portal } from "react-native-paper";
import FilledButton from "../FilledButton/FilledButton";

interface CustomDialogProps {
  dialogText: string;
  content: string;
  actionButtons: Array<JSX.Element>;
}
const CustomDialog: React.FC<CustomDialogProps> = (
  props: CustomDialogProps,
) => {
  const [visible, setVisible] = React.useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const { dialogText, content, actionButtons } = props;

  return (
    <View>
      <FilledButton title={dialogText} handlePress={showDialog} />
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
