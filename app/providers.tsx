'use client'

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 717,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: 'var(--page-background)',
      paper: 'var(--surface)',
    },
    text: {
      primary: '#2d3748',
      secondary: '#667085',
    },
  },
  shape: {
    borderRadius: 3,
  },
  typography: {
    fontFamily:
      'var(--font-geist-sans), "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", Arial, sans-serif',
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
})

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
