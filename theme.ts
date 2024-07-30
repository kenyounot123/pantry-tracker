'use client';
import { createTheme } from '@mui/material/styles';
import { Merriweather } from 'next/font/google';

// Load the Merriweather font
const merriweather = Merriweather({ subsets: ['latin'], weight: ['300', '400', '700', '900'] });

const theme = createTheme({
  palette: {
    primary: {
      main: '#9A4700',
      light: '#FFEACE',
    },
    secondary: {
      main: '#AB8A71',
    },
  },
  typography: {
    fontFamily: `${merriweather.style.fontFamily}`,
  }
});

export default theme;