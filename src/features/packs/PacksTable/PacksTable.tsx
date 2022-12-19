import * as React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'

import { PacksTableHead } from './PacksTableHead/PacksTableHead'

export type OrderType = 'asc' | 'desc'

const tableData = [
  {
    _id: '639f466c7792515ac401baff',
    user_id: '639df1359aa32653302bd565',
    user_name: 'Ivan',
    private: false,
    name: 'new name',
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
    cardsCount: 0,
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
    cardsCount: 0,
    type: 'pack',
    rating: 0,
    created: '2022-12-18T16:57:08.509Z',
    updated: '2022-12-18T16:57:08.509Z',
    more_id: '639df1359aa32653302bd565',
    __v: 0,
  },
]

type PacksTablePropsType = {
  order: OrderType
  orderBy: string
  setOrder: (order: OrderType, orderBy: string) => void
}

export function PacksTable(props: PacksTablePropsType) {
  const setSortHandler = (property: any) => {
    const isAsc = props.orderBy === property && props.order === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'

    props.setOrder(newOrder, property)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <PacksTableHead
              order={props.order}
              orderBy={props.orderBy}
              setSortHandler={setSortHandler}
            />
            <TableBody>
              {tableData.map(row => {
                return (
                  <TableRow key={row._id} hover>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.cardsCount}</TableCell>
                    <TableCell>{dayjs(row.updated).format('DD.MM.YYYY')}</TableCell>
                    <TableCell>{row.user_name}</TableCell>
                    {row.user_id === '639df1359aa32653302bd565' ? (
                      <TableCell>* * *</TableCell>
                    ) : (
                      <TableCell>*</TableCell>
                    )}
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
