import { extendTheme } from "@chakra-ui/react";
import "@fontsource/geist-sans";
import "@fontsource/geist-mono";
import "@fontsource-variable/lexend";
import "@fontsource-variable/roboto-mono";

const light = {
  text: {
    main: "#0c1718",
  },
  background: {
    main: "#eef5f6",
    50: "#eef5f6",
    100: "#deeced",
    200: "#bcd8dc",
    300: "#9bc5ca",
    400: "#79b1b9",
    500: "#589ea7",
    600: "#467e86",
    700: "#355f64",
    800: "#233f43",
    900: "#122021",
  },
  primary: {
    main: "#2a5a5a",
    50: "#eef7f7",
    100: "#dcefef",
    200: "#badede",
    300: "#97cece",
    400: "#74bebe",
    500: "#52adad",
    600: "#418b8b",
    700: "#316868",
    800: "#214545",
    900: "#102323",
  },
  secondary: {
    main: "#c98f8d",
    50: "#f7eeee",
    100: "#efdddc",
    200: "#debbba",
    300: "#ce9997",
    400: "#be7774",
    500: "#ad5552",
    600: "#8b4441",
    700: "#683331",
    800: "#452221",
    900: "#231110",
  },
  accent: {
    main: "#a0964b",
    50: "#f7f6ee",
    100: "#efeddc",
    200: "#dedaba",
    300: "#cec897",
    400: "#beb574",
    500: "#ada352",
    600: "#8b8241",
    700: "#686231",
    800: "#454121",
    900: "#232110",
  },
};

const dark = {
  text: {
    main: "#e7f2f3",
  },
  background: {
    main: "#091011",
    50: "#091011",
    100: "#10191f",
    200: "#182227",
    300: "#1f2f2f",
    400: "#273737",
    500: "#2e3f3f",
    600: "#354747",
    700: "#3d4f4f",
    800: "#445757",
    900: "#4b5f5f",
  },
  primary: {
    main: "#a5d5d5",
    50: "#eef7f7",
    100: "#dcefef",
    200: "#badede",
    300: "#97cece",
    400: "#74bebe",
    500: "#52adad",
    600: "#418b8b",
    700: "#316868",
    800: "#214545",
    900: "#102323",
  },
  secondary: {
    main: "#723836",
    50: "#f7eeee",
    100: "#efdddc",
    200: "#debbba",
    300: "#ce9997",
    400: "#be7774",
    500: "#ad5552",
    600: "#8b4441",
    700: "#683331",
    800: "#452221",
    900: "#231110",
  },
  accent: {
    main: "#b4aa5f",
    50: "#f7f6ee",
    100: "#efeddc",
    200: "#dedaba",
    300: "#cec897",
    400: "#beb574",
    500: "#ada352",
    600: "#8b8241",
    700: "#686231",
    800: "#454121",
    900: "#232110",
  },
};

const theme = extendTheme({
  colors: { light, dark },
  fonts: {
    heading: `'Lexend Variable', sans-serif`,
    body: `'Lexend Variable', sans-serif`,
    monospace: `'Roboto Mono Variable', monospace`,
  },
  initialColorMode: "light",
  useSystemColorMode: false,
});

export default theme;
