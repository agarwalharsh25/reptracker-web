import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E63946',
    },
    secondary: {
      main: '#376485',
    },
    error: {
      main: '#F2545B',
    },
    background: {
      default: '#FFFFFF',
    },
  },
});

export default theme;