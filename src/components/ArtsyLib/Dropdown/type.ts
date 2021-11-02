import { FlattenSimpleInterpolation } from "styled-components";

export interface DropDownitems {
  selected?: boolean;
  itemId?: number | string;
  itemUrl?: string;
  itemType?: "normal" | "logout";
  content: any;
  [x: string]: any;
}

export interface DropdownProps {
  items: DropDownitems[];
  CSS?: FlattenSimpleInterpolation;
  layer: number;
}

export interface FilterDropdownProps extends DropdownProps {
  dropdownType: "filter";
  selected?: string | number;
  setSelected?: (newValue?: any) => any;
}

export interface ConfigDropdownProps extends DropdownProps {
  dropdownType: "config";
}

export type DropdownType = { id: string } & (
  | FilterDropdownProps
  | ConfigDropdownProps
);
