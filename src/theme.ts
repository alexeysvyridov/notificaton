import {createTheme, Palette} from '@mui/material/styles'

declare module '@mui/material/styles/createPalette' {
  type PaletteOption = {
    main: React.CSSProperties['color'];
  }
  interface Palette  {
    palette: {
      warning: PaletteOption,
      info: PaletteOption,
      error: PaletteOption,
      success: PaletteOption,
      primary: PaletteOption,
    }
  }
}

const theme = createTheme({
  palette: {
    warning: {
      main: '#ffa726'
    },
    info: {
      main: '#81d4fa',
    },
    error: {
      main: '#ef5350',
    },
    success: {
      main: '#66bb6a',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#40c4ff',
    },
  },
  spacing: [0, 4, 8, 16, 32, 64],
});

export {theme};