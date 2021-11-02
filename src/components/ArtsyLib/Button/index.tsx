import React from "react";
import { Color, Size } from "../types";
import { Container, LinkContainer } from "./styles";
import "./styles.ts";
type PropsExtends =
  | React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  | React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >;
export type ButtonProps = PropsExtends & {
  color?: Color;
  size?: Size;
  onClick?: () => void;
  href?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  ref,
  color,
  size,
  href,
  ...props
}) => {
  return href ? (
    <LinkContainer color={color || "neutral"} size={size || "md"} {...props}>
      <span>{children}</span>
    </LinkContainer>
  ) : (
    <Container color={color || "neutral"} size={size || "md"} {...props}>
      <span>{children}</span>
    </Container>
  );
};
