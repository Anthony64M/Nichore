import { css, FlattenSimpleInterpolation } from 'styled-components'

export interface ContainerProps {
  layer: number
  CSS?: FlattenSimpleInterpolation
  open: boolean
  dropdownType: 'filter' | 'config'
}

export const containerVariables = css<ContainerProps>`
  position: relative;
  z-index: ${({ layer }) => layer.toString()};

  display: flex;
  flex-direction: column;
  align-items: ${({ dropdownType }) => dropdownType === 'config' && 'center'};
  justify-content: ${({ dropdownType }) =>
    dropdownType === 'config' && 'center'};

  transition: all 0.2s ease;
`

export const containerSelectedVariables = css`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  cursor: pointer;
`

export const listVariables = css<{ open?: boolean }>`
  max-height: ${({ open }) => (open ? '1000%' : '0')};

  overflow: hidden;
  position: absolute;
  z-index: 2;
  top: 110%;

  display: flex;
  flex-direction: column;

  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  list-style: none;
`

export const listItemVariables = css`
  font-size: 0.9rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
