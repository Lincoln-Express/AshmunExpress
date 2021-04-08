import * as React from "react";
import { StyleSheet, View } from "react-native";
import { List, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    borderWidth: 1.5,
    borderRadius: 3,
    marginVertical: 5,
    height: 72,
  },
  sectionTitle: {
    fontSize: 24,
    left: 20,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
  },
  children: {
    marginVertical: 10,
    marginLeft: 10,
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
