import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  .carousel-button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;

    align-items: center;
    padding: 1rem;
    background-color: var(--bg);
  }
  .image-input-dropzone {
    height: 100%;
    flex: 1;
  }
  .delete-image {
    position: absolute;
    top: 103%;
    right: 5%;
    fill: var(--cl-placeholder);
    cursor: pointer;
    &:hover {
      fill: var(--cl-danger);
    }
  }
`;
export const Dropzone = styled.span<{ active: boolean; showBorder: boolean }>`
  cursor: pointer;
  display: flex;
  position: relative;
  font-size: 2rem;
  color: ${({ active }) =>
    active ? "var(--cl-confirm)" : "var(--cl-placeholder)"};
  &:hover {
    color: var(--cl-confirm);
    .overlay {
      opacity: 1;
      visibility: visible;
    }
  }
  em {
    position: absolute;
    top: 5%;
    right: 5%;
    color: var(--fg);
    font-size: 0.8rem;
    font-style: normal;
    padding: 0.3em;
    z-index: 2;
    font-weight: 550;
    background-color: var(--bg);
    border-radius: 1em;
  }
  max-width: 100%;
  max-height: 100%;
  min-height: 100%;
  overflow: hidden;
  .carousel-item-container {
    display: flex;
    flex: 1;
    position: absolute;
    max-width: 100%;
    max-height: 100%;
    min-height: 100%;
    left: 0;
    right: 0;
  }

  border: ${({ showBorder }) =>
    showBorder ? "3px dashed currentColor" : "none"};
  border-radius: 0.6em;

  .image-input-image {
    flex: 1;
    max-height: 100%;
    display: flex;
    justify-content: center;
    max-width: 100%;
    img {
      max-height: 100%;
      min-height: 100%;
      width: auto;
    }
  }

  .overlay {
    font-size: 1em;
    opacity: 0;
    color: white;
    visibility: hidden;
    transition: opacity 0.2s ease;
    background-color: #0004;
    position: absolute;
    inset: 0 0 0 0;
  }
  .image-input-label,
  .overlay {
    h4 {
      font-size: 0.8em;
      text-align: center;
    }
    svg {
      height: 30px;
      width: 30px;
      flex-shrink:0;
    }
    flex: 1;
    padding: 2em 2em;
    gap: 1rem;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .image-input-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
  }
`;
