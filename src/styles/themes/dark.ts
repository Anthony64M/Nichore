import { DefaultTheme } from 'styled-components'
import { commonColors } from './common'

export const dark: DefaultTheme = {
  title: 'dark',

  colors: {
    ...commonColors,
    background: '#161820',
    font: 'rgba(255, 255, 255, 0.92)',
    placeholder: '#D2D2D2',
    star: '#4FD1C5',
    cardBackground: '#232430',
    detail: '#4FD1C5',
    primaryShadow: '5px 8px 22px rgba(79, 209, 197, 0.2)',
    secondaryShadow: '0px 4px 4px rgba(79, 209, 197, 0.25)',
    blur: '#c1c1c1eb',
  }
}

