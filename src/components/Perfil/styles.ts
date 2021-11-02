import styled from "styled-components";
import { IoMdMail, IoLogoTwitter } from 'react-icons/io';
import { AiOutlineInstagram } from 'react-icons/ai';
import { MdPhoto } from 'react-icons/md';

export const Container = styled.section<{ isEditMode: boolean }>`
  max-width: 100vw;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 2rem 0.5rem 1.75rem;

  main {
    max-width: 1120px;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3.06rem;

    .user {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: center;
      gap: 1.25rem;

      .propaganda {
        display: flex;
        flex-direction: column;
        align-self: center;
        gap: 1.5rem;

        figure {
          position: relative;

          img, div {
            max-width: 200px;
            max-height: 200px;
            min-width: 200px;
            min-height: 200px;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            box-shadow: ${(props) => props.theme.colors.primaryShadow};
          }

          > .image-input-container {
            position: absolute;
            top: 0;
            width: 200px;
            height: 200px;

            background: #212121c7;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;

            padding: 0 0.2rem;

            transition: filter 0.2s;

            &:hover {
              filter: brightness(1.25);
            }

            > label {
              text-align: center;
              font-weight: 500;
              color: ${props => props.theme.colors.placeholder};
            }

            input[type=file] {
              display: none;
            }
          }
        }

        .social-media {
          display: none;
          align-items: center;
          justify-content: center;
          flex-direction: ${props => props.isEditMode ? 'column' : 'row'};
          gap: 0.75rem;

          span {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;

            > input {
              width: 100%;
              background: transparent;
              border: none;
              border-bottom: 2px solid ${props => props.theme.colors.placeholder};
              color: ${props => props.theme.colors.font};
              padding: 0.2rem 0.4rem;
              outline: none;
              transition: border-bottom 0.3s ease-in-out;


              &::placeholder {
                font-size: 1rem;
                color: ${props => props.theme.colors.placeholder};
                opacity: 0.8;
              }

              &:focus {
                border-bottom: 2px solid ${props => props.theme.colors.lightGreen};
              }
            }
          }
        }
      }

      .userContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;

        .edit-input-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;

          gap: 0.5rem;

          &:first-child {
            margin-bottom: 1rem;
          }


          label {
            font-size: 1.2rem;
            color: ${props => props.theme.colors.placeholder};
          }

          input {
            width: 100%;
            background: transparent;
            border: none;
            border-bottom: 2px solid ${props => props.theme.colors.placeholder};
            color: ${props => props.theme.colors.font};
            outline: none;
            transition: border-bottom 0.3s ease-in-out;

            &:focus {
              border-bottom: 2px solid ${props => props.theme.colors.lightGreen};
            }
          }
          textarea {
            transition: border-color 0.3s ease-in-out;

            &:focus {
              border-color: ${props => props.theme.colors.lightGreen};
            }
          }
        }

        .username, input {
          font-size: 24px;
          line-height: 28px;
          font-weight: 500;
          color: ${props => props.theme.colors.font};
        }

        > span {
          display: flex;
          gap: 2rem;

          font-size: 1.1rem;
          color: ${(props) => props.theme.colors.placeholder};

          p {
            cursor: pointer;
            transition: transform 0.2s;

            &:hover {
              color: ${props => props.theme.colors.font};
              transform: translateX(8px);
            }
          }
        }

        > .buttons {
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 0.8rem;

          > .btn {
            margin-bottom: 1rem;
          }
        }

        > p {
          max-width: 275px;
          text-align: center;
        }

        .social-media {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: ${props => props.isEditMode ? 'column' : 'row'};
          gap: 0.75rem;

          span {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;

            > input {
              width: 100%;
              background: transparent;
              border: none;
              border-bottom: 2px solid ${props => props.theme.colors.placeholder};
              color: ${props => props.theme.colors.font};
              padding: 0.2rem 0.4rem;
              outline: none;
              transition: border-bottom 0.3s ease-in-out;


              &::placeholder {
                font-size: 1rem;
                color: ${props => props.theme.colors.placeholder};
                opacity: 0.8;
              }

              &:focus {
                border-bottom: 2px solid ${props => props.theme.colors.lightGreen};
              }
            }
          }
        }
      }


      > .buttons {
        > .btn {
          display: none;
          transition: opacity 0.3s;

          &:hover {
            opacity: 0.8;
          }
        }
      }
    }
  }

  article {
    margin-top: 2rem;
  }

  @media (min-width: 550px) {
    padding-top: 3rem;
    padding-bottom: 2rem;

    main {
      gap: 2.75rem;

      .user {
        flex-direction: row;

        .propaganda {
          align-self: flex-start;
        }
      }
    }
  }

  @media (min-width: 650px) {
    main {
      padding: 0 2.8rem;

      .user {
        align-items: flex-start;
        gap: 2rem;

        .propaganda {
          align-self: flex-start;

          > .social-media {
            display: flex;
          }
        }

        .userContent {
          width: 100%;
          align-items: flex-start;

          .edit-input-wrapper {
            align-items: flex-start;
          }

          > span {
            flex-direction: column;
            gap: 0.5rem;
          }

          > .buttons {
            > .btn {
              display: none;
            }
          }

          > p {
            margin-top: 1.75rem;
            max-width: 530px;
            text-align: left;
          }

          .social-media {
            display: none;
          }
        }

        > .buttons {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;

          > .btn {
            width: 100%;
            display: flex;
            padding: 0.5rem 1rem;
          }

        }
      }
    }
  }
`;

export const EmailIcon = styled(IoMdMail)`
  width: 1.75rem;
  height: 1.75rem;
  fill: ${props => props.theme.colors.like};
  flex-shrink: 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const InstagramIcon = styled(AiOutlineInstagram)`
  width: 1.75rem;
  height: 1.75rem;
  flex-shrink: 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const TwitterIcon = styled(IoLogoTwitter)`
  width: 1.75rem;
  height: 1.75rem;
  fill: #1DA1F2;
  flex-shrink: 0;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ImageIcon = styled(MdPhoto)`
  width: 2.75rem;
  height: 2.75rem;
  fill: ${props => props.theme.colors.placeholder};
  flex-shrink: 0;
`
