import React, { MouseEvent } from 'react'

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
import { ServerOrderType, TableOrder, TableOrderType } from '../../packs/PacksTable/PacksTable'

import { CardsActionCell } from './CardsActionCell/CardsActionCell'
import s from './CardsTable.module.scss'

const heads: HeadType<CardsOrderByType | 'actions'>[] = [
  { id: 'question', label: 'Question' },
  { id: 'answer', label: 'Answer' },
  { id: 'updated', label: 'Last updated' },
  { id: 'grade', label: 'Grade' },
  { id: 'actions', label: 'Actions' },
]

export type CardsOrderByType = 'question' | 'answer' | 'updated' | 'grade'
type ServerSortType = `${ServerOrderType}${CardsOrderByType}`

type CardsTablePropsType = {
  isMine: boolean
}

export const CardsTable: React.FC<CardsTablePropsType> = ({ isMine }) => {
  const serverData = [
    {
      _id: '6335dcb6110be402f8c1ca46',
      cardsPack_id: '63319bd2ef99210257c3d013',
      user_id: '63272e99d38dbc8a0103935d',
      answer: 'gfhj',
      question: 'update',
      grade: 0,
      shots: 0,
      questionImg: 'url or base 64',
      answerImg: 'url or base 64',
      answerVideo: 'url or base 64',
      questionVideo: 'url or base 64',
      comments: '',
      type: 'card',
      rating: 0,
      more_id: '63272e99d38dbc8a0103935d',
      created: '2022-09-29T17:58:14.743Z',
      updated: '2022-10-04T18:48:37.898Z',
      __v: 0,
    },
    {
      _id: '633c7ff21147012426bae92e',
      cardsPack_id: '63319bd2ef99210257c3d013',
      user_id: '63272e99d38dbc8a0103935d',
      answer: 'vbnm',
      question: 'update',
      grade: 0,
      shots: 0,
      questionImg: 'url or base 64',
      answerImg: 'url or base 64',
      answerVideo: 'url or base 64',
      questionVideo: 'url or base 64',
      comments: '',
      type: 'card',
      rating: 0,
      more_id: '63272e99d38dbc8a0103935d',
      created: '2022-10-04T18:48:18.396Z',
      updated: '2022-10-04T18:48:29.506Z',
      __v: 0,
    },
    {
      _id: '63358fd50691ba092c5ffa4d',
      cardsPack_id: '63319bd2ef99210257c3d013',
      user_id: '63272e99d38dbc8a0103935d',
      answer: 'no answer',
      question: 'map',
      grade: 0,
      shots: 0,
      questionImg: 'url or base 64',
      answerImg: 'url or base 64',
      answerVideo: 'url or base 64',
      questionVideo: 'url or base 64',
      comments: '',
      type: 'card',
      rating: 0,
      more_id: '63272e99d38dbc8a0103935d',
      created: '2022-09-29T12:30:13.992Z',
      updated: '2022-09-29T12:30:13.992Z',
      __v: 0,
    },
    {
      _id: '6335855c0691ba092c5ffa4c',
      cardsPack_id: '63319bd2ef99210257c3d013',
      user_id: '63272e99d38dbc8a0103935d',
      answer: 'no answer',
      question: 'map',
      grade: 0,
      shots: 0,
      questionImg: 'url or base 64',
      answerImg: 'url or base 64',
      answerVideo: 'url or base 64',
      questionVideo: 'url or base 64',
      comments: '',
      type: 'card',
      rating: 0,
      more_id: '63272e99d38dbc8a0103935d',
      created: '2022-09-29T11:45:32.807Z',
      updated: '2022-09-29T11:45:32.807Z',
      __v: 0,
    },
  ] // Replace to value from redux
  const serverSort: ServerSortType = '0updated' // Replace to value from redux
  const setServerSort = (serverSort: ServerSortType) => alert(JSON.stringify({ serverSort })) // Replace to dispatch

  const openCardHandler = (e: MouseEvent<HTMLTableRowElement>, id: string) => {
    alert('Open card - ' + id)
  }

  // Check current order
  const serverOrder = serverSort.slice(0, 1) as ServerOrderType
  const tableOrderBy = serverSort.slice(1) as CardsOrderByType
  const tableOrder: TableOrderType = serverOrder === TableOrder.asc ? 'asc' : 'desc'

  const setSortHandler = (property: CardsOrderByType) => {
    const isAsc = tableOrderBy === property && tableOrder === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'

    const newServerOrder: ServerSortType = `${TableOrder[newOrder]}${property}`

    setServerSort(newServerOrder)
  }
  const editCardHandler = () => alert('edit card')
  const deleteCardHandler = () => alert('delete card')

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table>
            <CustomTableHead
              heads={heads}
              order={tableOrder}
              orderBy={tableOrderBy}
              setSortHandler={setSortHandler}
            />
            <TableBody>
              {serverData.map(row => {
                return (
                  <TableRow
                    key={row._id}
                    hover
                    className={s.row}
                    onClick={e => openCardHandler(e, row._id)}
                  >
                    <TableCell>{row.question}</TableCell>
                    <TableCell>{row.answer}</TableCell>
                    <TableCell>{dayjs(row.updated).format('DD.MM.YYYY')}</TableCell>
                    <TableCell>{row.grade}</TableCell>
                    {isMine && (
                      <CardsActionCell editCard={editCardHandler} deleteCard={deleteCardHandler} />
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
