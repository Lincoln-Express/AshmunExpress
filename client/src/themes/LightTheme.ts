import { DefaultTheme as PaperDefaultTheme } from "react-native-paper";
import { DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native";

const LightTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: "#F57C00",
    text: "#273A7F",
    background: "#F5F5F5",
    card: "#F5F5F5",
    border: "#273A7F",
    notification: "#FF0000",
    accent: "#273A7F",
    placeholder: "#273A7F",
    backdrop: "#767577",
    surface: "#F5F5F5",
  },
};

export default LightTheme;
