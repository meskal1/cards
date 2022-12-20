import React, { useEffect } from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useSelector } from 'react-redux'

import { RootStateType } from '../../app/store'
import { BasicTable } from '../../common/components/Table/Table'
import { packsTable } from '../../constants/tableData'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { Pack } from '../../services/packsApi'
import { cretePacksTableBody, tableHeadCreator } from '../../utils/tableHeadCreator'

import { getAllPacks } from './packsReducer'

type PacksType = {}

export const Packs: React.FC<PacksType> = ({}) => {
  const dispatch = useAppDispatch()
  const head = tableHeadCreator(packsTable)
  const cardPacks = useSelector<RootStateType, Array<Pack>>(state => state.packs.cardPacks)

  const rows = cretePacksTableBody(cardPacks)

  useEffect(() => {
    dispatch(getAllPacks())
  }, [])

  return (
    <>
      <div>Packs1</div>
      <BasicTable head={head} rows={rows} />
    </>
  )
}
