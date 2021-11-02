import styled from 'styled-components'

export const Container = styled.div`
  max-width: 650px;
  width: 100%;
  padding: 0.6rem;

  background-color: ${props => props.theme.colors.cardBackground};
  box-shadow: ${props => props.theme.colors.secondaryShadow};
  border-radius: 20px;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 40%;

  .link {
    text-decoration: none;
  }

  .firstContainer {
    display: flex;
    align-items: center;

    .profileImage {
      width: 4.5rem;
      height: 4.5rem;
      margin-left: 0.5rem;

      border-radius: 50%;
    }
  }

  h2 {
    font-weight: lighter;
    color: ${props => props.theme.colors.font};
    margin-left: 1rem;
    font-size: 24px;
  }

  p {
    color: ${props => props.theme.colors.font};
    font-size: 16px;
  }

  @media (max-width: 920px) {
    .firstContainer {
      margin-left: 0;
    }
  }
`
