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

import { PacksActionCell } from './PacksActionCell/PacksActionCell'
import s from './PacksTable.module.scss'

export type PacksOrderByType = 'name' | 'cardsCount' | 'updated' | 'user_name'
export type ServerOrderType = '0' | '1'
type ServerSortType = `${ServerOrderType}${PacksOrderByType}`
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
  const userId = '639df1359aa32653302bd565' // Replace to value from redux
  const serverData = [
    {
      _id: '639f466c7792515ac401baff',
      user_id: '639df1359aa32653302bd565',
      user_name: 'Ivan',
      private: false,
      name: 'new name new name new name new name new name new name new name new name new name new name new name new name new name new name new name ',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 0,
      type: 'pack',
      rating: 0,
      created: '2022-12-18T16:57:16.794Z',
      updated: '2022-12-18T16:59:37.689Z',
      more_id: '639df1359aa32653302bd565',
      __v: 0,
      deckCover: null,
    },
    {
      _id: '639f46707792515ac401bb00',
      user_id: '639df1359aa32653302bd561',
      user_name: 'Ivan',
      private: false,
      name: 'new name',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 3,
      type: 'pack',
      rating: 0,
      created: '2022-12-18T16:57:20.385Z',
      updated: '2022-12-18T16:59:34.123Z',
      more_id: '639df1359aa32653302bd565',
      __v: 0,
      deckCover: null,
    },
    {
      _id: '639f46687792515ac401bafe',
      user_id: '639df1359aa32653302bd561',
      user_name: 'Ivan',
      private: false,
      name: '55',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 0,
      type: 'pack',
      rating: 0,
      created: '2022-12-18T16:57:12.643Z',
      updated: '2022-12-18T16:57:12.643Z',
      more_id: '639df1359aa32653302bd565',
      __v: 0,
    },
    {
      _id: '639f46647792515ac401bafd',
      user_id: '639df1359aa32653302bd565',
      user_name: 'Ivan',
      private: false,
      name: '55',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 2,
      type: 'pack',
      rating: 0,
      created: '2022-12-18T16:57:08.509Z',
      updated: '2022-12-18T16:57:08.509Z',
      more_id: '639df1359aa32653302bd565',
      __v: 0,
    },
  ] // Replace to value from redux
  const serverSort: ServerSortType = '0updated' // Replace to value from redux
  const setServerSort = (serverSort: ServerSortType) => alert(JSON.stringify({ serverSort })) // Replace to dispatch

  const openCardPackHandler = (e: MouseEvent<HTMLTableRowElement>, id: string) => {
    alert('Open card pack - ' + id)
  }

  // Check current order
  const serverOrder = serverSort.slice(0, 1) as ServerOrderType
  const tableOrderBy = serverSort.slice(1) as PacksOrderByType
  const tableOrder: TableOrderType = serverOrder === TableOrder.asc ? 'asc' : 'desc'

  const handleSetSort = (property: PacksOrderByType) => {
    const isAsc = tableOrderBy === property && tableOrder === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    const newServerOrder: ServerSortType = `${TableOrder[newOrder]}${property}`

    setServerSort(newServerOrder)
  }
  const handleStudyCardPack = () => alert('study card')
  const handleEditCardPack = () => alert('edit card')
  const handleDeleteCardPack = () => alert('delete card')

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
                    onClick={e => openCardPackHandler(e, row._id)}
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
                      onEdit={handleEditCardPack}
                      onDelete={handleDeleteCardPack}
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
