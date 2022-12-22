import * as React from 'react'

import { BorderColor, Delete, School } from '@mui/icons-material'
import { Box, Slider } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useSelector } from 'react-redux'

import { RootStateType } from '../app/store'
import { FormDialog } from '../common/components/ModalDialog/ModalDialog'
import { dialogModeType } from '../features/packs/Packs'
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

export const cretePacksTableBody = (
  data: Array<Pack>,
  opened: boolean,
  openModal: () => void,
  closeModal: () => void,
  selectPackId: (id: string) => void,
  changeDialogMode: (mode: dialogModeType) => void
) => {
  const userId = useSelector<RootStateType, string>(state => state.profile.userData.id)

  const handleOnEditClick = (id: string) => {
    changeDialogMode('edit')
    selectPackId(id)
    openModal()
  }

  const rows = data.map(row => {
    return (
      <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.cardsCount}</TableCell>
        <TableCell align="right">{row.updated}</TableCell>
        <TableCell align="right">{row.user_name}</TableCell>
        <TableCell align="right">
          <School />

          {userId === row.user_id ? <BorderColor onClick={() => handleOnEditClick(row._id)} /> : ''}
          {userId === row.user_id ? <Delete /> : ''}
        </TableCell>
      </TableRow>
    )
  })

  return rows
}
