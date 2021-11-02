import styled from "styled-components";
import { BsFilter } from "react-icons/bs";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-bottom: 0.5rem;

  > .search-input {
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.3rem;
  }

  @media (min-width: 720px) {

    > .search-input {
      display: none;
    }
  }
`;

export const FilterIcon = styled(BsFilter)`
  width: 1.8rem;
  height: 1.8rem;

  margin-left: 0.5rem;
  flex-shrink: 0;

  fill: ${props => props.theme.colors.font};

  @media (min-width: 720px) {
    display: none;
  }
`;
