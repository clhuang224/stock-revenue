'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
