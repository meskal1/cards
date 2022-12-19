import React from 'react'

import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

import { OrderType } from '../PacksTable'

interface EnhancedTableProps {
  order: OrderType
  orderBy: string
  setSortHandler: (property: any) => void
}

const heads = [
  { id: 'name', label: 'Name' },
  { id: 'cardsCount', label: 'Cards' },
  { id: 'updated', label: 'Last Updated' },
  { id: 'user_name', label: 'Created by' },
  { id: 'actions', label: 'Actions' },
]

export function PacksTableHead(props: EnhancedTableProps) {
  const { order, orderBy, setSortHandler } = props

  return (
    <TableHead>
      <TableRow>
        {heads.map(h =>
          h.id === 'actions' ? (
            <TableCell key={h.id} sortDirection={orderBy === h.id ? order : false}>
              {h.label}
            </TableCell>
          ) : (
            <TableCell key={h.id} sortDirection={orderBy === h.id ? order : false}>
              <TableSortLabel
                active={orderBy === h.id}
                direction={orderBy === h.id ? order : 'asc'}
                onClick={() => setSortHandler(h.id)}
              >
                {h.label}
                {orderBy === h.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  )
}
