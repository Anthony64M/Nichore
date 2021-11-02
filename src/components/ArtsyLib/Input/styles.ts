import styled, { css } from "styled-components";
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export const SearchInput = styled.div`
  position: relative;

  max-height: 33.5px;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${props => props.theme.colors.cardBackground};
  box-shadow: ${props => props.theme.colors.secondaryShadow};
  border-radius: 1.25rem;

  > input {
    width: 100%;
    border: 0;
    border-radius: 1.25rem;
    padding: 0.3rem 3rem 0.3rem 1.25rem;
    outline: none;

    font-size: 1rem;
    line-height: 1.25rem;
    border: 2px solid transparent;
    transition: border 0.2s;
    background: ${props => props.theme.colors.cardBackground};
    color: ${props => props.theme.colors.font};

    &:focus {
      border: 2px solid ${props => props.theme.colors.detail};
    }

    &::placeholder {
      color: ${props => props.theme.colors.placeholder};
    }
  }

  > .iconRight {
    max-width: 24px;
    max-height: 24px;
    flex-shrink: 0;

    position: absolute;
    right: 0;
    margin-right: 1.25rem;

    cursor: pointer;
    transition: transform 0.2s;
    background: none;

    &:hover,
    &:focus {
      transform: scale(1.1);
    }
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: auto;

  resize: none;
  padding: 1.25rem 1rem;
  overflow-y: hidden;

  background: transparent;
  color: ${props => props.theme.colors.font};

  border: 1px solid ${props => props.theme.colors.placeholder};
  box-sizing: border-box;
  border-radius: 0.75rem;

  white-space: pre-line;
  font-size: 1rem;
  line-height: 1.18rem;
  outline: 0;
`;

const defaultInputStyle = css`
  max-height: 47px;

  outline: none;

  padding: 0.6rem 1.18rem;

  background: ${props => props.theme.colors?.cardBackground || '#FFF'};
  box-shadow: ${props => props.theme.colors?.secondaryShadow || '2px 2px 17px rgba(0, 0, 0, 0.25)'};
  color: ${props => props.theme.colors?.font || 'rgba(0, 0, 0, 0.6)'};
  border: 0;
  border: 2px solid transparent;
  border-radius: 0.75rem;

  font-size: 1rem;

  transition: border 0.4s;

  &::placeholder {
    color: ${props => props.theme.colors?.placeholder || 'rgba(0, 0, 0, 0.4)'};
  }

  &:focus {
    border: 2px solid ${props => props.theme.colors?.detail || '#BFD8EF'};
  }

  @media (max-width: 280px) {
    font-size: 0.9rem;
  }
`

export const NormalInput = styled.input`
  ${defaultInputStyle}
`;

export const PasswordInput = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  > input {
    ${defaultInputStyle};
    width: 100%;
    padding-right: 2.45rem;
  }

  > .icon {
    position: absolute;
    right: 0;
    margin-right: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    font-size: 0;
    background: none;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }
`

export const VisibleEye = styled(FaEye)`
  fill: rgba(0, 0, 0, 0.6);
  width: 1.6rem;
  height: 1.6rem;
`

export const HiddenEye = styled(FaEyeSlash)`
  fill: rgba(0, 0, 0, 0.6);
  width: 1.6rem;
  height: 1.6rem;
`
