import React, { createContext, useEffect, useState } from "react";
import { DefaultTheme, ThemeProvider } from 'styled-components'

import { light } from "../styles/themes/light";
import { dark } from "../styles/themes/dark";

export interface ThemeContextProps {
  theme: DefaultTheme;
  toggleTheme: () => void;
}

export const ArtsyThemeContext = createContext({} as ThemeContextProps)

export const ThemeContextProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(light)

  function toggleTheme() {
    setTheme(theme.title === 'light' ? dark : light)
  }

  useEffect(() => {
    const storageValue = localStorage.getItem('@Artsy.theme')

    if (storageValue === 'dark') {
      setTheme(dark)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('@Artsy.theme', theme.title)
  }, [theme])

  return (
    <ArtsyThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ArtsyThemeContext.Provider>
  )
}
