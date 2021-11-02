import styled from "styled-components";

export const Container = styled.figure`
  max-height: 400px;
  height: 60vh;
  position: relative;

  & > div {
    border-radius: 20px 20px 5px 5px;
  }

  .image {
    z-index: 2;
  }

  .background-image {
    filter: blur(10px);
  }

  > .image-counter {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;

    width: 2.937rem;
    height: 2rem;
    margin: 0.687rem 0.687rem 0 0;

    background: ${(props) => props.theme.colors.cardBackground};
    box-shadow: ${props => props.theme.colors.secondaryShadow};

    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 0.875rem;
  }

  > .left {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0 auto 0.75rem;
    z-index: 10;
  }

  > .right {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto 0.75rem auto 0;
    z-index: 10;

  }
`
