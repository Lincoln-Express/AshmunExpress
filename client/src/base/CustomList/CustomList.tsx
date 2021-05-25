import * as React from "react";
import { StyleSheet, View } from "react-native";
import { List, useTheme } from "react-native-paper";
import { heightSize, widthSize } from "../../themes/sizes";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderWidth: widthSize.s / 10,
    borderRadius: widthSize.s / 5,
    marginVertical: heightSize.s / 6,
  },
  sectionTitle: {
    fontSize: widthSize.m,
    left: widthSize.xl / 2,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  children: {
    marginVertical: heightSize.s / 3,
    marginLeft: widthSize.l / 3,
  },
});

interface CustomListProps {
  title: string;
  description?: string;
  children: any;
}

const CustomList: React.FC<CustomListProps> = (props: CustomListProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const { title, description, children } = props;
  const theme = useTheme();
  const borderColor = theme.dark ? "#F5F5F5" : "#273A7F";
  const onPress = () => setExpanded(!expanded);

  return (
    <List.AccordionGroup>
      <List.Accordion
        style={{ ...styles.container, borderColor }}
        title={title}
        id={title}
        expanded={expanded}
        onPress={onPress}
        titleStyle={styles.sectionTitle}
        description={description || null}
      >
        <View style={styles.children}>{children}</View>
      </List.Accordion>
    </List.AccordionGroup>
  );
};

CustomList.defaultProps = {
  description: "",
};
export default CustomList;
