'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material'

export type BaseTableColumn = {
  id: string
  label: ReactNode
}

export type BaseTableRow = {
  id: string
  label: ReactNode
  cells: Record<string, ReactNode>
}

type BaseTableProps = {
  firstColumnLabel: ReactNode
  columns: BaseTableColumn[]
  rows: BaseTableRow[]
  minWidth?: number
  firstColumnWidth?: number
  columnMinWidth?: number
}

export default function BaseTable({
  firstColumnLabel,
  columns,
  rows,
  minWidth = 760,
  firstColumnWidth = 160,
  columnMinWidth = 120,
}: BaseTableProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current

    if (container) {
      container.scrollLeft = container.scrollWidth
    }
  }, [columns, rows])

  return (
    <TableContainer
      ref={containerRef}
      component={Box}
      sx={{
        overflowX: 'auto',
        borderTop: 1,
        borderLeft: 1,
        borderRight: 1,
        borderColor: 'divider',
      }}
    >
      <Table
        size="small"
        sx={{ tableLayout: 'auto', minWidth }}
      >
        <TableBody>
          <TableRow>
            <TableCell
              component="th"
              sx={{
                width: firstColumnWidth,
                bgcolor: 'table.header',
                fontWeight: 700,
                borderRight: 1,
                borderColor: 'divider',
                left: 0,
                minWidth: firstColumnWidth,
                position: 'sticky',
                boxShadow: (theme) => `inset -1px 0 0 ${theme.palette.divider}`,
                whiteSpace: 'nowrap',
                zIndex: 2,
              }}
            >
              {firstColumnLabel}
            </TableCell>
            {columns.map((column, index) => (
              <TableCell
                key={column.id}
                align="center"
                sx={{
                  bgcolor: 'table.headerLight',
                  fontWeight: 700,
                  borderRight: index === columns.length - 1 ? 0 : 1,
                  borderColor: 'divider',
                  minWidth: columnMinWidth,
                  whiteSpace: 'nowrap',
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell
                component="th"
                sx={{
                  bgcolor: 'table.header',
                  fontWeight: 700,
                  borderRight: 1,
                  borderColor: 'divider',
                  left: 0,
                  minWidth: firstColumnWidth,
                  position: 'sticky',
                  boxShadow: (theme) =>
                    `inset -1px 0 0 ${theme.palette.divider}`,
                  whiteSpace: 'nowrap',
                  zIndex: 1,
                }}
              >
                {row.label}
              </TableCell>
              {columns.map((column, index) => (
                <TableCell
                  key={`${row.id}-${column.id}`}
                  align="center"
                  sx={{
                    borderRight: index === columns.length - 1 ? 0 : 1,
                    borderColor: 'divider',
                    color: 'text.secondary',
                    minWidth: columnMinWidth,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {row.cells[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
