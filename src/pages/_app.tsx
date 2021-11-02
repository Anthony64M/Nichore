import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { ThemeContextProvider } from "../contexts/themeContext";
import { AuthContextProvider } from "../contexts/authContext";
import { SearchContextProvider } from "src/contexts/searchContext";

import { Header } from "../components/Header";

import GlobalStyle from "../styles/globals";

function MyApp({ Component, pageProps, router }: AppProps) {
  const { pathname } = router;

  const header = !(pathname === "/account/create" || pathname === "/account/login")

    return (
      <ThemeContextProvider>
        <AuthContextProvider>
          <SearchContextProvider>
            <GlobalStyle />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {header && <Header />}
            <Component {...pageProps} />
          </SearchContextProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    );

}

export default MyApp;
