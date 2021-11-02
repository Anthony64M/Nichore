import styled, { FlattenSimpleInterpolation } from "styled-components";
import {
  containerVariables,
  containerSelectedVariables,
  listItemVariables,
  listVariables,
} from "./styledVariables";

interface ContainerProps {
  layer: number;
  CSS?: FlattenSimpleInterpolation;
  open: boolean;
  dropdownType: "filter" | "config";
}

export const FilterContainer = styled.div<ContainerProps>`
  flex: 1;
  ${containerVariables};

  min-height: 24px;
  min-width: 5rem;
  height: 2rem;

  background-color: ${props => props.theme.colors.filter};
  border: 1px solid ${props => props.theme.colors.detail};
  border-radius: ${({ open }) => (open ? "0.9em 0.9em 0 0" : "0.9em")};

  @media (max-width: 400px) {
    height: 1.25rem;
  }
`;

export const FilterSelected = styled.div<{ open?: boolean }>`
  flex: 1;
  ${containerSelectedVariables};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0.5rem;

  border-radius: 0.9em;

  .filter-label {
    flex: 1;

    font-size: 1rem;
    color: ${props => props.theme.colors.font};
    cursor: pointer;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (max-width: 400px) {
      font-size: 0.85rem;
    }
  }
  .filter-arrow {
    height: 1.1em;
    width: 1.1em;

    transform: ${({ open }) => `rotate(${open ? "180deg" : "0deg"})`};
    fill: ${props => props.theme.colors.font};
    transition: all 0.2s ease;
  }
`;
export const FilterList = styled.ul<{ open: boolean }>`
  ${listVariables};

  right: 0;
  left: 0;

  box-shadow: ${props => props.theme.colors.secondaryShadow};
  background: ${props => props.theme.colors.cardBackground};
  border-radius: 0 0 0.5em 0.5em;
  transition: all 0.2s ease;
`;

export const FilterListItem = styled.li`
  min-height: 2rem;
  padding: 0.5em;

  &:hover {
    background-color: rgba(191, 216, 239, 0.3);
  }

  > button {
    text-align: left;
    ${listItemVariables};
    color: ${props => props.theme.colors.placeholder};
    width: 100%;
    height: 100%;
    border: 0;
    background: none;
  }
`;

export const ConfigContainer = styled.div<ContainerProps>`
  width: 1.7rem;
  height: 2rem;

  ${containerVariables};
`;

export const ConfigSelected = styled.div<{ open?: boolean }>`
  ${containerSelectedVariables};

  display: flex;
  align-items: center;
  justify-content: center;

  .config-arrow {
    height: 1.3em;
    width: 1.3em;

    flex-shrink: 0;

    transform: ${({ open }) => `rotate(${open ? "180deg" : "0deg"})`};
    fill: ${props => props.theme.colors.font};
    transition: all 0.2s ease;
  }
`;

export const ConfigList = styled.ul<{ open: boolean }>`
  ${listVariables};
  min-width: 6rem;

  padding: 0.625rem 0.5rem 1.3rem;

  background: ${props => props.theme.colors.cardBackground};
  box-shadow: ${props => props.theme.colors.secondaryShadow};
  border-radius: 1.25rem;

  transition: all 0.2s ease-in-out;

  @media(max-width: 720px) {
    transform: scale(1.1) translateY(10px) translateX(-25px);
  }
`;

export const ConfigListItem = styled.li<{ itemType?: 'logout' | 'normal' }>`
  ${listItemVariables};

  width: 100%;

  text-align: center;
  color: ${({ itemType }) => itemType === 'logout' ? props => props.theme.colors.danger : props => props.theme.colors.placeholder};
  transition: color 0.2s;

  border-bottom: 1px solid ${props => props.theme.colors.detail};
  cursor: pointer;

  padding-bottom: 0.3rem;

  &:not(:first-child) {
    padding-top: 0.5rem;
  }

  &:hover {
    color: ${props => props.theme.colors.font};
    filter: brightness(1.2);
  }
`;
