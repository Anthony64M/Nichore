import styled from 'styled-components'

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  > h2 {
    font-family: "Inder", "Roboto", sans-serif;
    font-weight: 500;
    text-align: center;
    color: ${props => props.theme.colors.blur};
  }

  filter: brightness(0.7)
`
