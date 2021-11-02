import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${props => props.theme?.colors.background || '#FAFAFA'};
    color: ${props => props.theme?.colors.font || '#21243D'};
  }

  body, input, button, textArea {
    font: 400 1rem 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  button {
    border: none;
    cursor: pointer;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%; //15px
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%; //14px
    }
  }

  :root {
    /* --fg : #000000;
    --bg: #FAFAFA;
    --cl-primary: #BFD8EF;
    --cl-confirm: #319795;
    --cl-danger: #F56565;
    --cl-neutral: #F3F3F3;
    --cl-white: #FFFFFF;
    --cl-placeholder: #989898; */
  }

  body::-webkit-scrollbar {
    width: 0.4rem;
  }
  body::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme?.colors.filter || 'rgba(191, 216, 239, 0.3)'};
    border-radius: 10px;
  }
  body::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
