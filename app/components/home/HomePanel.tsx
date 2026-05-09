import type { ReactNode } from 'react'
import { Box, Paper, Typography } from '@mui/material'

type HomePanelProps = {
  title?: ReactNode
  leftAction?: ReactNode
  rightAction?: ReactNode
  children?: ReactNode
}

export default function HomePanel({
  title,
  leftAction,
  rightAction,
  children,
}: HomePanelProps) {
  const hasToolbar = title || leftAction || rightAction

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderColor: 'var(--border)',
        borderRadius: '4px',
      }}
    >
      {hasToolbar ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            mb: children ? 2 : 0,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            {title ? (
              <Typography
                component="h1"
                sx={{ fontSize: 18, fontWeight: 600 }}
              >
                {title}
              </Typography>
            ) : (
              leftAction
            )}
          </Box>
          {rightAction ? <Box sx={{ flexShrink: 0 }}>{rightAction}</Box> : null}
        </Box>
      ) : null}
      {children}
    </Paper>
  )
}
