import styled from "styled-components";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 2rem;
  height: 2rem;

  border-radius: 50%;

  transition: filter 0.2s;

  &:hover {
    filter: brightness(90%);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const ArrowRightIcon = styled(IoIosArrowForward)``;

export const ArrowLeftIcon = styled(IoIosArrowBack)``;
