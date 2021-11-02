import styled from "styled-components";
import { BsFillEyeFill } from "react-icons/bs";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

export const Container = styled.div`
  max-width: 100vw;
  display: flex;
  justify-content: center;

  padding-bottom: 2rem;

  > .wrapper {
    max-width: 1095px;
    width: 100%;
    height: 100%;

    margin-top: 2.25rem;
    padding: 0 0.5rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > .art-container {
      max-width: 756px;
      width: 100%;

      border-radius: 0 0 20px 20px;
      background: ${(props) => props.theme.colors.cardBackground};
      box-shadow: ${(props) => props.theme.colors.primaryShadow};

      > .work-info-container {
        min-height: 150px;

        padding-bottom: 2rem;

        border-radius: 0 0 20px 20px;

        > .avatar {
          margin: 1rem 1rem 0;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-between;

          > .user {
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;

            > .user-wrapper {
              width: 100%;
              height: 100%;

              display: flex;
              justify-content: flex-start;

              img {
                width: 2.7rem;
                height: 2.7rem;
                border-radius: 50%;
              }

              > span {
                margin-left: 0.875rem;

                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;

                > h1 {
                  font-size: 1.1rem;
                  font-weight: 500;
                  max-width: 20ch; //25

                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }

                > h2 {
                  font-size: 0.87rem;
                  font-weight: 300;
                  line-height: 22px;

                  max-width: 20ch; //25

                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }

            > .follow-button {
              max-width: 130px;
              width: 100%;
              align-self: flex-start;
              margin-top: 1.3rem;
            }
          }

          > span {
            margin: 1rem 0 2rem;
            display: flex;
            align-items: center;

            > .like-button {
              width: auto;
              height: auto;
              background: none;
              font-size: 0;
            }

            > p {
              display: flex;
              align-items: center;
              margin: 0 1rem 0 0.6rem;

              font-size: 0.8rem;
              font-weight: 300;
              line-height: 22px;
            }

            > .like {
              color: ${(props) => props.theme.colors.like};
            }
          }
        }
      }

      .description {
        padding: 0 0.5rem 1.3rem 1rem;

        color: ${(props) => props.theme.colors.font};
        word-break: break-all;
        font-size: 1rem;
        font-weight: 400;
      }

      .tagButtons {
        margin: 0rem 0.5rem 1.75rem 0.5rem;

        .tag {
          padding: 0.5rem;
          margin: 0.4rem;

          font-size: 0.9rem;
          background-color: ${(props) => props.theme.colors.detail};
          color: ${(props) => props.theme.colors.font};
          border-radius: 50px;
        }
      }

      .galery {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        padding: 0 1rem;

        h3 {
          margin-left: 2rem;
          font-weight: 300;
          font-size: 1.08rem;
        }

        .galery-wrapper {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: auto;
          gap: 1rem;

          margin-top: 1rem;
          align-items: center;

          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
      }
    }

    .comments {
      max-width: 756px;
      width: 100%;
      margin-top: 1.5rem;
      border-radius: 15px;

      display: flex;
      flex-direction: column;
      align-items: center;

      > h2 {
        font-size: 1.18rem;
        margin-bottom: 1.5rem;
      }

      > .comments-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;

        position: relative;
        overflow-x: hidden;
        padding: 1rem 0.8rem;

        > div {
          &:not(:first-child) {
            margin-top: 1rem;
          }

          &:not(:last-child) {
            margin-bottom: 1rem;
          }
        }

        .mobile-form {
          display: flex;
          gap: 0.5rem;
        }

        .mobile-input {
          position: sticky;
          width: 100%;
          top: 0;
          left: 0;
          right: 0;
        }

        .submit-button {
          background: none;
          border-radius: 50%;
          font-size: 0;
          background: ${props => props.theme.colors.cardBackground};
          color: ${props => props.theme.colors.font};
          box-shadow: ${props => props.theme.colors.secondaryShadow};
          padding: 0.5rem 0.6rem;

          svg {
            color: ${props => props.theme.colors.star}
          }
        }

        &::-webkit-scrollbar {
          width: 0.15rem;
        }
        &::-webkit-scrollbar-thumb {
          background-color: ${(props) => props.theme.colors.detail};
          border-radius: 20px;
        }
        &::-webkit-scrollbar-track {
          background-color: transparent;
        }
      }

      .desktop-input {
        display: none;
      }
    }
  }

  @media (min-width: 320px) {
    .wrapper {
      .art-container {
        .work-info-container {
          .avatar {
            height: auto;
            flex-direction: row;
            margin: 0.8rem 0.8rem 1rem;

            span {
              flex-direction: column;

              > p {
                margin: 1rem 0 0.6rem;
              }
            }
          }
          .tagButtons {
            margin: 0 0.8rem 1rem;
          }
        }
      }
    }
  }

  @media (min-width: 450px) {
    .wrapper {
      align-items: center;
      gap: 0.9rem;

      .art-container {
        /* width: 28.5rem; */

        .work-info-container {
          .avatar {
            margin: 1.5rem 1.5rem 1.75rem;

            flex-direction: row;

            > .user {
              width: 100%;
              height: auto;
              flex-direction: row;

              > .user-wrapper {
                width: auto;

                align-self: flex-start;
                align-items: center;

                > img {
                  width: 3.125rem;
                  height: 3.125rem;
                }

                > span {
                  > h1 {
                    font-size: 1.3rem;
                  }

                  > h2 {
                    font-size: 1.1rem;
                  }
                }
              }

              > .follow-button {
                align-self: center;
                margin: 0 auto;
              }
            }

            > span {
              margin: 0;
              display: flex;
              flex-direction: row;
              align-items: center;

              > p {
                margin: 0 1rem 0 0.6rem;
              }

              > .like {
                color: ${(props) => props.theme.colors.like};
              }
            }
          }

          .description {
            padding: 0 3rem 1.12rem;
          }

          .tagButtons {
            margin: 0 2rem 2rem;
          }

          .galery {
            h3 {
              font-size: 1.18rem;
            }

            .galery-wrapper {
              grid-gap: 2rem;

              img {
                border-radius: 20px;
              }
            }
          }
        }
      }

      .comments {
        max-height: 100vh;
        overflow-y: auto;
        padding: 0.5rem 0;
      }
    }
  }

  @media (min-width: 920px) {
    .wrapper {
      .art-container {
        .work-info-container {
          .avatar {

            > span {
              flex-direction: row;


              > p {
                margin: 0 1rem 0 0.6rem;
              }
            }
          }

          > .description {
            padding-top: 1rem;
          }
        }
      }
    }
  }

  @media (min-width: 1120px) {
    .wrapper {
      gap: 2.375rem;

      flex-direction: row;
      align-items: flex-start;

      .art-container {
        .work-info-container {
          .avatar {
            align-items: center;

            .user {
              width: 100%;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
            }
          }
        }
      }

      .comments {
        width: 300px;
        position: relative;
        align-items: flex-start;
        margin-top: 0;
        padding-top: 0;

        h2 {
          display: none;
        }

        .comments-wrapper {
          width: 100%;
          height: 100%;
          padding: 0 0.5rem 5rem;

          .mobile-input {
            display: none;
          }

          .submit-button {
            display: none;
          }
        }

        .desktop-input {
          display: inline-block;
          position: absolute;
          bottom: 0;
          margin-bottom: 1rem;
          align-self: center;
          width: 90%;
        }
      }
    }
  }
`;

export const HeartFillIcon = styled(RiHeartFill)`
  fill: ${(props) => props.theme.colors.like};
  width: 25px;
  height: 25px;
  flex-shrink: 0;
`;

export const HeartIcon = styled(RiHeartLine)`
  fill: ${(props) => props.theme.colors.like};
  width: 25px;
  height: 25px;
  flex-shrink: 0;
`;

export const EyeIcon = styled(BsFillEyeFill)`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;
