import * as React from "react";
import { StyleSheet, View } from "react-native";
import { List } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    elevation: 1,
    borderRadius: 1.5,
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

  const handlePress = () => setExpanded(!expanded);

  return (
    <List.AccordionGroup>
      <List.Accordion
        style={styles.container}
        title={title}
        id={title}
        expanded={expanded}
        onPress={handlePress}
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
