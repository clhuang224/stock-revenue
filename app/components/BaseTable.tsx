import type { ReactNode } from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";

export type BaseTableColumn = {
  id: string;
  label: ReactNode;
};

export type BaseTableRow = {
  id: string;
  label: ReactNode;
  cells: Record<string, ReactNode>;
};

type BaseTableProps = {
  firstColumnLabel: ReactNode;
  columns: BaseTableColumn[];
  rows: BaseTableRow[];
  minWidth?: number;
  firstColumnWidth?: number;
};

export default function BaseTable({
  firstColumnLabel,
  columns,
  rows,
  minWidth = 760,
  firstColumnWidth = 160,
}: BaseTableProps) {
  return (
    <TableContainer
      component={Box}
      sx={{
        overflowX: "auto",
        borderTop: "1px solid var(--border)",
        borderLeft: "1px solid var(--border)",
      }}
    >
      <Table size="small" sx={{ tableLayout: "fixed", minWidth }}>
        <TableBody>
          <TableRow>
            <TableCell
              component="th"
              sx={{
                width: firstColumnWidth,
                bgcolor: "var(--table-header)",
                fontWeight: 700,
                borderRight: "1px solid var(--border)",
              }}
            >
              {firstColumnLabel}
            </TableCell>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align="center"
                sx={{
                  bgcolor: "var(--table-header-light)",
                  fontWeight: 700,
                  borderRight: "1px solid var(--border)",
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
                  bgcolor: "var(--table-header)",
                  fontWeight: 700,
                  borderRight: "1px solid var(--border)",
                  whiteSpace: "nowrap",
                }}
              >
                {row.label}
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={`${row.id}-${column.id}`}
                  align="center"
                  sx={{ borderRight: "1px solid var(--border)", color: "text.secondary" }}
                >
                  {row.cells[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
