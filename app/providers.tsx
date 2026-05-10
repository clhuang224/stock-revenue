'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    chart: {
      revenue: string
      revenueSoft: string
      growth: string
    }
    table: {
      header: string
      headerLight: string
    }
  }

  interface PaletteOptions {
    chart?: {
      revenue?: string
      revenueSoft?: string
      growth?: string
    }
    table?: {
      header?: string
      headerLight?: string
    }
  }
}

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
      default: '#eeeeee',
      paper: '#ffffff',
    },
    divider: '#d8dde3',
    text: {
      primary: '#2d3748',
      secondary: '#667085',
    },
    chart: {
      revenue: '#f5a400',
      revenueSoft: '#ffe08a',
      growth: '#ef5350',
    },
    table: {
      header: '#f3f6f9',
      headerLight: '#f8fafc',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily:
      'var(--font-geist-sans), "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", Arial, sans-serif',
    h6: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: 1.4,
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 700,
          minHeight: 37,
          paddingLeft: 18,
          paddingRight: 18,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor: theme.palette.divider,
          fontSize: 14,
          height: 49,
        }),
        head: {
          fontWeight: 700,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          fontSize: 14,
        },
      },
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
