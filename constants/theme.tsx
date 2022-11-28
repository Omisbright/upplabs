import { DefaultTheme, ExtendedTheme } from "@react-navigation/native";

import Colors from "./Colors";

export const lightTheme: ExtendedTheme = {
    colors: {
        ...DefaultTheme.colors,
        background: Colors.dark.background,
        text: Colors.dark.text,
        border: Colors.light.black,
    }
};

export const darkTheme: ExtendedTheme = {
    ...lightTheme,
    colors: {
        background: Colors.light.background,
        text: Colors.light.text,
        border: Colors.dark.white,
    },
};

