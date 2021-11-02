import { DefaultTheme } from 'styled-components'
import { commonColors } from './common'

export const light: DefaultTheme = {
  title: 'light',

  colors: {
    ...commonColors,
    background: '#FAFAFA',
    font: '#21243D',
    placeholder: '#989898',
    star: '#FFC328',
    cardBackground: '#FFF',
    detail: '#BFD8EF',
    primaryShadow: '4px 5px 4px rgb(109 109 109 / 42%)',
    secondaryShadow: '0px 4px 4px rgba(109, 109, 109, 0.25)',
    blur: '#6f6f6feb',
  }
}
