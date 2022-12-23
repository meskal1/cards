import * as React from 'react'
import { MouseEvent } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'

import {
  CustomTableHead,
  HeadType,
} from '../../../common/components/CustomTableHead/CustomTableHead'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { PackType } from '../../../services/packsApi'
import {
  deletePackTC,
  setSortValue,
  SortValuesType,
  updatePackTC,
  UpdatePackDataType,
} from '../packsSlice'

import { PacksActionCell } from './PacksActionCell/PacksActionCell'
import s from './PacksTable.module.scss'

export type PacksOrderByType = 'name' | 'cardsCount' | 'updated' | 'user_name'
export type ServerOrderType = '0' | '1'

export enum TableOrder {
  asc = '0',
  desc = '1',
}

export type TableOrderType = 'asc' | 'desc'

const heads: HeadType<PacksOrderByType>[] = [
  { id: 'name', label: 'Name' },
  { id: 'cardsCount', label: 'Cards' },
  { id: 'updated', label: 'Last Updated' },
  { id: 'user_name', label: 'Created by' },
]

type PacksTablePropsType = {}

export function PacksTable({}: PacksTablePropsType) {
  const userId = useAppSelector(state => state.profile.userData.id)
  const serverData = useAppSelector<PackType[]>(state => state.packs.tableData)
  const serverSort = useAppSelector<SortValuesType>(state => state.packs.queryParams.sortPacks)

  const dispatch = useAppDispatch()

  const handleOpenCardPack = (e: MouseEvent<HTMLTableRowElement>, id: string) => {
    alert('Open card pack - ' + id)
  }

  // Check current order
  const serverOrder = serverSort.slice(0, 1) as ServerOrderType
  const tableOrderBy = serverSort.slice(1) as PacksOrderByType
  const tableOrder: TableOrderType = serverOrder === TableOrder.asc ? 'asc' : 'desc'

  const handleSetSort = (property: PacksOrderByType) => {
    const isAsc = tableOrderBy === property && tableOrder === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    const newServerOrder: SortValuesType = `${TableOrder[newOrder]}${property}`

    dispatch(setSortValue({ sortPacks: newServerOrder }))
  }
  const handleStudyCardPack = () => alert('study card')
  const handleEditCardPack = (data: UpdatePackDataType) => {
    dispatch(updatePackTC(data))
  }
  const handleDeleteCardPack = (id: string) => {
    dispatch(deletePackTC(id))
  }

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table>
            <CustomTableHead
              heads={heads}
              order={tableOrder}
              orderBy={tableOrderBy}
              onSetSort={handleSetSort}
            />
            <TableBody>
              {serverData.map(row => {
                return (
                  <TableRow
                    className={s.row}
                    key={row._id}
                    hover
                    onClick={e => handleOpenCardPack(e, row._id)}
                  >
                    {heads.map(h => {
                      return (
                        <TableCell key={h.id}>
                          <p className={s.tableCellText}>
                            {h.id === 'updated' ? dayjs(row[h.id]).format('DD.MM.YYYY') : row[h.id]}
                          </p>
                        </TableCell>
                      )
                    })}
                    <PacksActionCell
                      isMine={row.user_id === userId}
                      isStudyDisabled={row.cardsCount === 0}
                      onStudy={handleStudyCardPack}
                      onEdit={() => handleEditCardPack({ id: row._id, name: 'updated name' })}
                      onDelete={() => handleDeleteCardPack(row._id)}
                    />
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
