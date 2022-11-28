import "@react-navigation/native";

// Override the theme in react native navigation to accept our custom theme props.
declare module "@react-navigation/native" {
  export type ExtendedTheme = {
    colors: {
      background: string;
      border: string;
      text: string;
    };
  };
  export function useTheme(): ExtendedTheme;
}
