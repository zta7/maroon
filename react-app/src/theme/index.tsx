import { ThemeProvider, createTheme } from '@mui/material/styles'
import React from 'react'

type Props = {
  children: any
}

export const MuiThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = useMemo(
    () => createTheme({
      palette: {
        primary: {
          main: '#000000',
        },
      },
      components: {
        MuiListItemIcon: {
          styleOverrides: {
            root: {
              color: 'inherit',
            },
          },
        },
      },
    }),
    [],
  )
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

// declare module '@mui/material/styles/createTheme' {
//   interface Theme {
//     status: {
//       danger: React.CSSProperties['color'];
//     };
//   }
//   interface PaletteColor {
//     darker?: string;
//   }
//   interface SimplePaletteColorOptions {
//     darker?: string;
//   }
//   // interface ThemeOptions {
//   //   status: {
//   //     danger: React.CSSProperties['color'];
//   //   };
//   // }
// }

// declare module '@mui/material/styles/createPalette' {
//   interface Palette {
//     neutral: Palette['primary'];
//   }
//   interface PaletteOptions {
//     neutral: PaletteOptions['primary'];
//   }
// }
