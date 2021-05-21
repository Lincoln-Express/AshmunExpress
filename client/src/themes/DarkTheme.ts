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
    text: "#F5F5F5",
    background: "#121212",
    card: "#121212",
    border: "#F57C00",
    notification: "#F5F5F5",
    accent: "#273A7F",
    placeholder: "#808080",
    backdrop: "#767577",
    surface: "#121212",
  },
};

export default DarkTheme;
