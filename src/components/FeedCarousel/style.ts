import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 400px;
  max-height: 360px;
  overflow: hidden;

  header {
    display: flex;
    align-items: center;

    gap: 0.4em;

    margin-bottom: 2.12rem;
    padding-left: 6rem;

    > h3 {
      font-weight: 400;
      line-height: 19px;
      color: ${props => props.theme.colors.font};
    }
  }

  .carousel-cards-wrapper {
    display: flex;
    flex: 1;

    .card-grid {
      flex: 1;

      position: relative;
      cursor: grab;
    }

    .carousel-item-container {
      display: flex;
      flex: 1;
      position: absolute;
      gap: 2rem;
      width: 100%;
      justify-content: center;
    }

    .carousel-button-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;

      align-items: center;
      padding: 1rem;
      background-color: ${props => props.theme.colors.background};
    }
  }

  @media (min-width: 350px) {
    min-height: 350px;
  }
`;
