import React from 'react'

import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

import { PacksOrderByType, TableOrderType } from '../PacksTable'

import s from './PacksTableHead.module.scss'

export type PacksHeadType = {
  id: PacksOrderByType | 'actions'
  label: string
}

const heads: PacksHeadType[] = [
  { id: 'name', label: 'Name' },
  { id: 'cardsCount', label: 'Cards' },
  { id: 'updated', label: 'Last Updated' },
  { id: 'user_name', label: 'Created by' },
  { id: 'actions', label: 'Actions' },
]

type EnhancedTableProps = {
  order: TableOrderType
  orderBy: PacksOrderByType
  setSortHandler: (property: any) => void
}

export function PacksTableHead({ order, orderBy, setSortHandler }: EnhancedTableProps) {
  return (
    <TableHead className={s.tableHead}>
      <TableRow>
        {heads.map(h =>
          h.id === 'actions' ? (
            <TableCell key={h.id}>{h.label}</TableCell>
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
