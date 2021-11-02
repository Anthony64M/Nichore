import styled, { keyframes, css } from "styled-components";

const rotate = keyframes`
  ${"100%"} {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  ${"0%"} {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  ${"50%"} {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  ${"100%"} {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

export interface LoadingProps {
  wholePage?: boolean;
  isVisible?: boolean;
}

export const LoadingContainer = styled.div<LoadingProps>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ wholePage, isVisible }) =>
    wholePage &&
    css`
      position: fixed;
      z-index: 999;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      visibility: ${isVisible ? "visible" : "hidden"};
      background-color: var(--cl-bg);
    `}
  .spinner {
    width: 6em;
    height: 6em;
    animation: ${rotate} 1.6s linear infinite;
    & .path {
      stroke: var(--cl-primary);
      stroke-linecap: square;
      animation: ${dash} 1.5s ease-in-out infinite;
    }
  }
`;

export const Loading: React.FC<LoadingProps> = ({
  wholePage,
  isVisible = true,
}) => {
  return (
    <LoadingContainer wholePage={wholePage} isVisible={isVisible}>
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        ></circle>
      </svg>
    </LoadingContainer>
  );
};
