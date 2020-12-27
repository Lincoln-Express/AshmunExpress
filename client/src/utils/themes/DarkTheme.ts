import { DarkTheme as PaperDarkTheme } from "react-native-paper";
import { DarkTheme as NavigationDarkTheme } from "@react-navigation/native";

const DarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: "#F57C00",
    text: "#FFF",
    background: "#000",
    card: "#000",
    border: "#F57C00",
    notification: "#FFF",
    accent: "#273A7F",
    placeholder: "#C0C0C0",
    backdrop: "#767577",
    surface: "#000",
  },
};

export default DarkTheme;
