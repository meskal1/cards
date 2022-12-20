import * as React from 'react'

import { BorderColor, Delete, School } from '@mui/icons-material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { Pack } from '../services/packsApi'

export const tableHeadCreator = (data: Array<string>) =>
  data.map((item, i) =>
    i > 0 ? (
      <TableCell align="right" key={item}>
        {item}
      </TableCell>
    ) : (
      <TableCell key={item}>{item}</TableCell>
    )
  )

export const cretePacksTableBody = (data: Array<Pack>) => {
  const rows = data.map(row => (
    <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">{row.cardsCount}</TableCell>
      <TableCell align="right">{row.updated}</TableCell>
      <TableCell align="right">{row.user_name}</TableCell>
      <TableCell align="right">
        <School />
        <BorderColor />
        <Delete />
      </TableCell>
    </TableRow>
  ))

  return rows
}
