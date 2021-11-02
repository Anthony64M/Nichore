import styled from "styled-components";

export const CommentCardContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  border-bottom: 1px solid ${props => props.theme.colors.detail};

  .wrapper {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 0.6rem;

    > .link {
      display: flex;
      align-items: center;
      justify-content: center;

      color: ${props => props.theme.colors.font};
      cursor: pointer;
      text-decoration: none;

      > .user {
        display: flex;
        align-items: center;
        justify-content: center;

        > img {
          width: 2rem;
          height: 2rem;

          margin-right: 0.5rem;

          border-radius: 50%;
        }
      }

      > h3 {
        max-width: 20ch;

        font-size: 1rem;
        border-bottom: 2px solid transparent;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

  }

  > .comment {
    line-height: 1.3rem;
    font-size: 0.9rem;

    color: ${props => props.theme.colors.font};

    margin-bottom: 0.5rem;
  }

  > button {
    font-size: 0.9rem;
    line-height: 1.3rem;
    color: ${props => props.theme.colors.confirm};
    background: none;
    border: none;

    outline: none;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: ${props => props.theme.colors.detail};
    }
  }

  @media (min-width: 360px) {
    > .wrapper {
      > .link {
        > h3 {
          max-width: 30ch;
          font-size: 1.1rem;
          transition: border-bottom-color 0.2s;

          &:hover {
            border-bottom-color: ${props => props.theme.colors.detail};
          }
        }
      }
    }

    > .comment {
      font-size: 1rem;
    }
  }

  @media (min-width: 520px) {
    .wrapper {
      .link {
        h3 {
          max-width: 20ch;
        }
      }
    }
  }
`;
