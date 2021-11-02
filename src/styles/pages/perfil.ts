import styled from "styled-components";

export const Container = styled.div`
  max-width: 100vw;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-bottom: 2rem;

  .postsContainer {
    max-width: 980px;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 2.5rem;

    .content {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media(min-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media(min-width: 1000px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`
