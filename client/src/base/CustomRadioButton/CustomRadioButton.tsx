import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 3,
    maxWidth: "70%",
  },
  text: {
    padding: 10,
    paddingLeft: 10,
    marginLeft: 120,
  },
});

interface CustomRadioButtonProps {
  text: string;
  value: string;
  isCorrect: boolean;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = (
  props: CustomRadioButtonProps,
) => {
  const [borderColor, setBorderColor] = React.useState("#273A7F");
  const [radioColor, setRadioColor] = React.useState("");
  const { text, value, isCorrect } = props;
  const theme = useTheme();

  if (isCorrect === false) {
    setBorderColor("#fc2003");
    setRadioColor("#fc2003");
  } else if (isCorrect === true) {
    setBorderColor("#03fc28");
    setRadioColor("#03fc28");
  }

  return (
    <View style={styles.outerContainer}>
      <View style={{ ...styles.innerContainer, borderColor }}>
        <Text style={{ ...styles.text, color: theme.colors.text }}>{text}</Text>
        <RadioButton
          value={value}
          color={radioColor}
          uncheckedColor="#273A7F"
        />
      </View>
    </View>
  );
};

export default CustomRadioButton;
