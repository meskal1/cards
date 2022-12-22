import React, { MouseEvent } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
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

export type CardsOrderByType = 'question' | 'answer' | 'updated' | 'grade'

const heads: HeadType<CardsOrderByType>[] = [
  { id: 'question', label: 'Question' },
  { id: 'answer', label: 'Answer' },
  { id: 'updated', label: 'Last updated' },
  { id: 'grade', label: 'Grade' },
]

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
      question:
        'updateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdateupdate',
      grade: 5,
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
      answer:
        'vbnmvbnmvbnmvbn mvbnmvbnmvbnmvbnmvbnmvbnmvbnmv bnmvbnmvbnmvbnmvbnmvbnmvbnm bnmvbnmvbnmvbnmvbnmvbnmvbnm',
      question: 'updateupdateupdateupdateupda',
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
      grade: 3,
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
      grade: 2,
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
  const handleEditCard = () => alert('edit card')
  const handleDeleteCard = () => alert('delete card')

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table>
            <CustomTableHead
              heads={heads}
              order={tableOrder}
              orderBy={tableOrderBy}
              onSetSort={setSortHandler}
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
                    {heads.map(h => {
                      return (
                        <TableCell key={h.id}>
                          {h.id === 'grade' ? (
                            <Rating value={row[h.id]} readOnly />
                          ) : (
                            <p className={s.tableCellText}>
                              {h.id === 'updated'
                                ? dayjs(row[h.id]).format('DD.MM.YYYY')
                                : row[h.id]}
                            </p>
                          )}
                        </TableCell>
                      )
                    })}
                    {isMine && (
                      <CardsActionCell onEdit={handleEditCard} onDelete={handleDeleteCard} />
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
