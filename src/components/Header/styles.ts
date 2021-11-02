import styled from "styled-components";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";

export const Container = styled.header`
  position: sticky;
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;

  padding: 1.12rem 0.9rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.theme.colors.background};

  > h1 {
    font-family: "Inder", "Roboto", sans-serif;
    font-size: 1.75rem;
    font-weight: 400;
    line-height: 2.1rem;
    text-transform: uppercase;
    cursor: pointer;
    margin-right: 0.5rem;
  }

  > button {
    margin-left: 1rem;
    background: none;
    font-size: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  > .wrapper {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    .functionalities {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      > .login {
        flex-shrink: 0;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
        transition: filter 0.2s;
        margin-left: 1rem;

        &:hover {
          filter: brightness(0.8);
        }
      }

      .addArt, .search-input {
        display: none;
      }
    }

    > .user {
      display: flex;
      align-items: center;
      justify-content: center;

      > .avatar {
        display: flex;
        align-items: center;
        justify-content: center;

        > img {
          width: 2.125rem;
          height: 2.125rem;

          border-radius: 50%;

          margin: 0 0.4rem;
        }
      }
    }
  }

  @media (min-width: 720px) {
    padding: 1.12rem 1.25rem;

    > h1 {
      margin: 0;
    }

    > .wrapper {
      justify-content: space-between;
      flex-direction: row-reverse;
      margin-left: 1.25rem;

      > .functionalities {

        .search-input {
          display: flex;
        }

        .addArt {
          width: 100%;
          margin-left: 1rem;
          display: block;

          transition: filter 0.2s;

          &:hover {
            filter: brightness(0.8);
          }
        }
      }

      > .user {
        flex-direction: row-reverse;

        margin-right: 1rem;

        > .avatar {
          > img {
            margin: 0 0.46rem 0 0;
          }
        }
      }
    }
  }
`;

export const SearchIcon = styled(AiOutlineSearch)`
  width: 1.5rem;
  height: 1.5rem;
  display: none;
  flex-shrink: 0;

  color: ${props => props.theme.colors.placeholder};

  @media (min-width: 720px) {
    display: block;
  }
`

export const BellIcon = styled(AiOutlineBell)`
  width: 2rem;
  height: 2rem;

  flex-shrink: 0;

  color: ${props => props.theme.colors.placeholder};

  @media (min-width: 720px) {
    margin-left: 0.5rem;
  }
`;

export const PencilIcon = styled(HiPencil)`
  width: 1.3rem;
  height: 1.3rem;

  flex-shrink: 0;

  margin-left: 0.5rem;

  color: ${props => props.theme.colors.placeholder};
`;
