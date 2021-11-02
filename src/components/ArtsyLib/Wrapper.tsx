import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  breakpoints: {
    sm: "568px",
    md: "768px",
    lg: "1200px",
  },
};


const Wrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

export default Wrapper;
