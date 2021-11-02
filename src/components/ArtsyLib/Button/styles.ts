import styled, { css } from "styled-components";
import { Color, Size } from "../types";

interface ButtonStyleProps {
  color: Color;
  size: Size;
}

const fontSizeMap: { [x: string]: string } = {
  sm: "0.8rem",
  md: "1rem",
  lg: "1.2rem",
};
const style = css`
  outline: none;
  border: none;
  border-radius: 3rem;

  padding: 0.4em 0.8em;

  display: flex;
  overflow: hidden;
  align-items: center;

  cursor: pointer;

  span {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 400;
  }
`;
export const Container = styled.button<ButtonStyleProps>`
  font-size: ${({ size }) => fontSizeMap[size]};
  background-color: ${({ color, ...props }) => props.theme.colors[color]};
  box-shadow: ${(props) => props.theme.colors.secondaryShadow};
  color: ${({ color, ...props }) =>
    color === "neutral" || color === "white" || color === "primary"
      ? props.theme.colors.black
      : color === "confirm" || color === "danger" ? "#FFF" : props.theme.colors.placeholder};
  ${style}
`;

export const LinkContainer = styled.a<ButtonStyleProps>`
  font-size: ${({ size }) => fontSizeMap[size]};
  background-color: ${({ color, ...props }) => props.theme.colors[color]};
  box-shadow: ${(props) => props.theme.colors.secondaryShadow};
  color: ${({ color, ...props }) =>
    color === "neutral" || color === "white" || color === "primary"
      ? props.theme.colors.black
      : props.theme.colors.placeholder};
  ${style}
`;
