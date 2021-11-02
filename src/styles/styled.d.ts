import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    colors: {
      black: string,
      lightGreen: string,
      filter: string,
      carouselButton: string,
      danger: string,
      like: string,
      confirm: string,
      background: string,
      font: string,
      placeholder: string,
      star: string,
      cardBackground: string,
      primaryShadow: string,
      secondaryShadow: string,
      primary: string,
      detail: string,
      neutral: string,
      blur: string,
    }
  }
}
