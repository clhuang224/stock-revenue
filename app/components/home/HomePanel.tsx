import type { ReactNode } from 'react'
import { Box, Paper, Skeleton, Typography } from '@mui/material'

type HomePanelProps = {
  title?: ReactNode
  loading?: boolean
  leftAction?: ReactNode
  rightAction?: ReactNode
  children?: ReactNode
}

export default function HomePanel({
  title,
  loading = false,
  leftAction,
  rightAction,
  children,
}: HomePanelProps) {
  const hasToolbar = loading || title || leftAction || rightAction

  return (
    <Paper
      sx={{
        p: 2,
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
            {loading ? (
              <Skeleton
                variant="text"
                width={170}
                height={26}
                sx={{ fontSize: 18 }}
              />
            ) : title ? (
              <Typography
                component="h1"
                variant="h6"
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
