import styled from "styled-components";

interface cardStyleProps {
  cardTypeStyle: "feed" | "perfil";
}

export const PostCardContainer = styled.div<cardStyleProps>`
  max-width: 300px;
  max-height: 328px;
  width: ${(props) => (props.cardTypeStyle === "feed" ? "14.5rem" : "15.7rem")};
  height: 328px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;

  padding-bottom: 1rem;

  border-radius: 1.25rem;
  background: ${(props) => props.theme.colors.cardBackground};
  box-shadow: ${(props) => props.theme.colors.primaryShadow};
  transition: all 0.2s;

  > .link {
    width: 100%;
    min-width: 100%;
    max-height: 75%;
    height: 75%;
    cursor: pointer;
    position: relative;

    & > div {
      border-radius: 1.25rem 1.25rem 0.75rem 0.75rem;
    }
    > img {
      width: 100%;
      height: 100%;
      margin-bottom: 0.3rem;
    }
  }

  > .wrapper {
    width: 100%;
    height: 25%;
    padding: 0 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    > .details {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      > .user {
        display: flex;
        align-items: center;
        text-decoration: none;
        transition: all 0.3s;

        .userImage {
          position: relative;
          max-width: 2.5rem;
          max-height: 2.5rem;
          border-radius: 50%;
          overflow: hidden;

          margin-right: 0.5rem;

          img {
            max-width: 2.5rem;
            max-height: 2.5rem;
            width: 100%;
            height: 100%;
          }
        }

        > p {
          max-width: 100px;

          font-weight: 600;
          color: ${(props) => props.theme.colors.placeholder};

          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      > h2 {
        width: 100%;
        font-size: 1.25rem;
        font-weight: 300;
        line-height: 1.4rem;
        color: ${(props) => props.theme.colors.font};

        max-width: 235px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
      }

      > .likes {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        > button {
          margin-right: 0.2rem;

          font-size: 0;
          background: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s;

          &:hover {
            &:first-child {
              transform: scale(1.17);
            }
          }
        }

        > p {
          font-size: 0.9rem;
          color: ${(props) => props.theme.colors.placeholder};
        }
      }
    }
  }
  @media (min-width: 350px) {
    width: 100%;
    height: 17rem;

    &:hover {
      transform: translateY(-5px);
    }

    > .wrapper {
      > .details {
        > .user {
          > p {
            max-width: 160px;
            padding: 0 0.3rem 0;

            border-bottom: 2px solid transparent;
            transition: border-bottom-color 0.3s;

            &:hover {
              border-bottom-color: ${(props) => props.theme.colors.filter};
            }
          }
        }

        > .likes {
          flex-direction: row;

          > p {
            font-size: 1rem;
          }
        }
      }
    }
  }
`;
