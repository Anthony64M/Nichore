import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  padding: 3rem 2rem;

  .user-information {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    font-size: 1.5rem;
    line-height: 28px;
    font-weight: 500;
    color: ${props => props.theme.colors.font};

    img {
      max-width: 200px;
      max-height: 200px;
      min-width: 200px;
      min-height: 200px;
      border-radius: 50%;
      box-shadow: ${(props) => props.theme.colors.primaryShadow};
    }

    @media(max-width: 400px) {
      flex-direction: column;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.3rem;
  }

`
