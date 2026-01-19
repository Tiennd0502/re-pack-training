import { ReactElement } from "react";
import { IconProps } from "./style";

export interface Category {
  key: string;
  label: string;
  Icon: (props: IconProps) => ReactElement;
}
