import styled from 'styled-components'

export const TabsContainer = styled.div`
  font-size: 19px;
  font-weight: 400;

  > .firstContainer {
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    a {
      text-decoration: none;
      transition: transform 0.2s;
      color: ${props => props.theme.title === 'light' ? '#6f6f6feb' : '#c1c1c1eb'};
      font-family: "Inder", "Roboto", sans-serif;

      &:hover {
        transform: scale(1.1);
      }
    }

    .separator {
      width: 5px;
      height: 5px;
      margin: 0 0.8rem;

      background: ${props => props.theme.colors.detail};
      box-shadow: ${props => props.theme.colors.secondaryShadow};
      border-radius: 50%;
    }

    &::before, &::after {
      content: '';
      width: 20%;
      height: 1px;
      margin-right: 1rem;

      background: ${props => props.theme.colors.detail};
      box-shadow: ${props => props.theme.colors.secondaryShadow};
      border-radius: 10px;
    }

    &::after {
      margin: 0 0 0 1rem;
    }
  }
`
