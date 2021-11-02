import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.2rem;

  color: rgba(0, 0, 0, 0.6);


  p {
    font-size: 0.9rem; //1.12rem
    text-align: center;

    strong {
      color: #319795;
      text-decoration: underline;
      cursor: pointer;
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.8;
      }
    }

    @media(min-width: 650px) {
      font-size: 1.12rem;
    }
  }

  .link {
    font-size: 0.9rem;
  }

  span {
    display: flex;
    flex-direction: column;
    align-self: center;
    gap: 0.5rem;
    cursor: default;

    h2 {
      font-size: 1.75rem; //2.25rem
      font-weight: 400;
      text-align: center;
      text-transform: capitalize;

      @media(min-width: 650px) {
        font-size: 2.25rem;
      }
    }
  }

  form {
    width: 100%;

    display: flex;
    flex-direction: column;

    > span {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      margin-bottom: 2rem;

      .accountLabel {
        font-size: 1.05rem; //1.12
        line-height: 21px;
        font-weight: 500;

        @media(min-width: 650px) {
          font-size: 1.12rem;
        }
      }
    }

    > button {
      width: 100%;
      height: 3.12rem;

      background: #4FD1C5;
      color: #FFF;
      box-shadow: 5px 6px 13px rgb(0 0 0 / 25%);
      border-radius: 12px;
      border: 3px solid transparent;

      font-size: 1.25rem; //1.5rem
      font-weight: 300;
      line-height: 36%;
      text-align: center;
      letter-spacing: 0.07em;
      transition: all 0.3s ease-in-out;

      &:hover {
        background: transparent;
        color: #4FD1C5;
        border-color: #4FD1C5;
      }

      @media(min-width: 650px) {
        font-size: 1.5rem;
      }
    }
  }
`
