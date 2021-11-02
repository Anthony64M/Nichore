import styled from "styled-components";
import { FaSearch, FaStar } from "react-icons/fa";

export const Container = styled.section`
  max-width: 100vw;
  width: 100%;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 576px) {
    padding: 5vh;
  }

  @media (min-width: 1170px) {
    padding: 5vh 5vw;
  }
`;

export const Star = styled(FaStar)`
  width: 1.5rem;
  height: 1.5rem;

  fill: ${props => props.theme.colors.star};
`

export const SearchIcon = styled(FaSearch)`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;

  color: ${props => props.theme.colors.star};
`
