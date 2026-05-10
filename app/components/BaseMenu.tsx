'use client'

import { useState, type ReactNode } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Button, Menu, MenuItem } from '@mui/material'

export type BaseMenuOption<TValue extends string | number> = {
  label: ReactNode
  value: TValue
}

type BaseMenuProps<TValue extends string | number> = {
  id: string
  label: ReactNode
  options: BaseMenuOption<TValue>[]
  value: TValue
  onChange: (value: TValue) => void
}

export default function BaseMenu<TValue extends string | number>({
  id,
  label,
  options,
  value,
  onChange,
}: BaseMenuProps<TValue>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const isOpen = Boolean(anchorEl)

  return (
    <>
      <Button
        variant="contained"
        aria-controls={isOpen ? id : undefined}
        aria-expanded={isOpen ? 'true' : undefined}
        aria-haspopup="menu"
        endIcon={
          <KeyboardArrowDownIcon
            fontSize="small"
            sx={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: (theme) =>
                theme.transitions.create('transform', {
                  duration: theme.transitions.duration.shortest,
                }),
            }}
          />
        }
        onClick={(event) =>
          setAnchorEl((currentAnchorEl) =>
            currentAnchorEl ? null : event.currentTarget,
          )
        }
      >
        {label}
      </Button>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          pointerEvents: 'none',
        }}
        slotProps={{
          paper: {
            sx: {
              minWidth: anchorEl?.offsetWidth,
              pointerEvents: 'auto',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === value}
            onClick={() => {
              onChange(option.value)
              setAnchorEl(null)
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
