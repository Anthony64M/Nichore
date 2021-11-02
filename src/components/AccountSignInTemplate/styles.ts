import styled from "styled-components";

export const AccountSignInTemplateContainer = styled.section`
  height: 100vh;

  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  overflow-y: auto;
  padding: 1.5rem 1rem 0;

  & > div {
    z-index: -1;

    /* background-position-y: 0; */
    filter: brightness(0.8);
  }

  aside {
    flex: 3;
    height: 100%;

    display: flex;
    flex-direction: column;
    color: #21243d;
    cursor: default;

    h1 {
      font-size: 4.25rem;
      font-family: "Inder";
      letter-spacing: 0.23em;
      line-height: 6.25rem;
      text-transform: uppercase;
      text-align: center;
      text-shadow: 17px 10px 7px rgba(0, 0, 0, 0.25);

      @media (min-width: 500px) {
        font-size: 5.25rem;
      }

      @media (min-width: 700px) {
        font-size: 6.25rem;
      }
    }

    p {
      text-align: center;

      @media (min-width: 500px) {
        font-size: 1.15rem;
      }
    }
  }

  main {
    flex: 9;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    > .content {
      max-width: 920px;
      max-height: 800px;
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      align-items: center;

      background: rgba(255, 255, 255, 0.85);
      box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
      border-radius: 16px;
      padding: 2rem 1.5rem 1.18rem;
    }
  }

  @media (min-width: 920px) {
    padding: 0;
    gap: 0;
    flex-direction: row;
    padding: 2.8rem 3.8rem 1.18rem 0;

    aside {
      flex: 8;
      justify-content: center;
    }

    main {
      flex: 6;

      .content {
        padding: 2rem 3rem;
      }
    }
  }
`;
