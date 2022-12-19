import React from 'react'

import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

import { TableOrderType } from '../../../features/packs/PacksTable/PacksTable'

import s from './CustomTableHead.module.scss'

export type HeadType<T> = {
  id: T
  label: string
}

type CustomTableHeadPropsType<T> = {
  heads: HeadType<T>[]
  order: TableOrderType
  orderBy: T
  setSortHandler: (property: any) => void
}

export const CustomTableHead = <T extends string>({
  order,
  orderBy,
  heads,
  setSortHandler,
}: CustomTableHeadPropsType<T>) => {
  return (
    <TableHead className={s.tableHead}>
      <TableRow>
        {heads.map(h =>
          h.id === 'actions' ? (
            <TableCell key={h.id} size={'small'}>
              {h.label}
            </TableCell>
          ) : (
            <TableCell key={h.id}>
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
