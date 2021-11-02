import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";

const inputStyles = css`
  width: 100%;
  outline: none;
  padding: 0.475rem 0.91rem;

  background: transparent;
  color: ${props => props.theme.colors.font};
  border: 2px solid ${props => props.theme.colors.placeholder};
  box-shadow: ${props => props.theme.title === 'dark' && props.theme.colors.primaryShadow};
  border-radius: 12px;

  transition: border, border-radius 0.4s;

  &::placeholder {
    color: ${props => props.theme.colors.placeholder};
  }

  &:focus {
    border-radius: 20px;
    border: 2px solid ${props => props.theme.colors.detail};
  }
`

export const Container = styled.div`
  height: calc(100vh - 60px);
  padding: 3vh 0 0 3vw;

  &,
  section {
    display: flex;
    flex-direction: column;
  }

  .image-input-container {
    max-height: 40vh;

    height: 40vh;
    flex-shrink: 0;
  }

  .form {
    padding: 2rem 0.5em;
    gap: 1rem;
    align-items: center;

    .titleInput {
      max-height: 47px;

      ${inputStyles};
    }

    textarea {
      min-height: 5rem;
      resize: vertical;

      ${inputStyles};
    }

    .tagInput {
      width: 100%;
      min-height: 7rem;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      padding: 0.475rem 0.91rem;


      background: transparent;
      border: 2px solid ${props => props.theme.colors.placeholder};
      box-shadow: ${props => props.theme.title === 'dark' && props.theme.colors.primaryShadow};
      border-radius: 12px;

      span {
        display: flex;
        align-items: center;
        gap: 1.4rem;

        input {
          flex: 1;
          padding-bottom: 0.3rem;

          outline: none;
          box-shadow: none;
          background: transparent;
          border: 2px solid transparent;
          border-bottom-color: ${props => props.theme.colors.filter};
          color: ${props => props.theme.colors.font};
          transition: border-bottom-color 0.2s ease-in-out;

          &::placeholder {
            color: ${props => props.theme.colors.placeholder};
          }

          &:focus {
            border-bottom-color: ${props => props.theme.colors.detail};
          }
        }

        .addTag {
          transition: filter 0.3s ease-out;

          &:hover {
            filter: brightness(0.9);
          }
        }
      }

      .tagList {
        display: flex;
        align-self: stretch;
        flex-wrap: wrap;
        gap: 0.8rem;

        em {
          font-style: normal;
          background-color: ${props => props.theme.colors.detail};
          color: ${props => props.theme.colors.font};
          border-radius: 1em;
          padding: 0.3em;
          display: flex;
          align-items: center;
          cursor: pointer;

          svg {
            margin-left: 0.5rem;
          }
        }
      }
    }

    .submit {
      width: 50%;
      align-self: center;
      flex-shrink: 0;
      font-weight: 600;
      color: ${props => props.theme.colors.font};
      border: 2px solid transparent;

      transition: all 0.3s;

      &:hover {
        border: 2px solid ${props => props.theme.colors.confirm};
        color: ${props => props.theme.colors.confirm};
        background: transparent;
      }
    }
  }

  @media (min-width: 768px) {
    flex-direction:row;
    gap: 2.2rem;

    .form {
      flex: 0.9;
      background-color:var(--cl-white);
      order: 1;
      border-radius: 1em;
      align-items:stretch;

      .submit {
        margin-top: auto;
      }
    }

    .gallery {
      order:2;
      flex-basis:40%;
    }
  }
`;

export const AddIcon = styled(MdAdd)`
  width: 2.2rem;
  height: 2.2rem;
  fill: ${props => props.theme.colors.font};
  flex-shrink: 0;
`;
