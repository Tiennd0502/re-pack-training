import { ViewStyle } from "react-native";

export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: ViewStyle;
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
  onPress?: () => void;
}

export enum DIRECTION {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export interface Theme {
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  quinary: string;
  senary: string;
  septenary: string;

  background: string;
  bgIconForm: string;
  bgSelectedMethod: string;

  error: string;
  success: string;
  info: string;
  favorite: string;

  fontFamilyPrimary: string;
  fontFamilySecondary: string;
  fontFamilyTertiary: string;
}
