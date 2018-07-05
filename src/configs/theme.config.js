import { createMuiTheme } from 'material-ui/styles';

export const CustomTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#536dfe',
      main: '#5c6bc0',
      dark: '#315eff',
      contrastText: '#5c6bc0',
    },
    secondary: {
      light: '#ffe57f',
      main: '#ffe57f',
      dark: '#ffe57f',
      contrastText: '#ffe57f',
    },
    error: {
      light: '#ef5350',
      main: '#ef5350',
      dark: '#ef5350',
      contrastText: '#ef5350',
    },
    black: '#000000',
    black_700: '#616161',
    white: '#ffffff',
    grey_900: '#212121',
    grey_100: '#f5f5f5',
    grey_50: '#fafafa',
  },
});