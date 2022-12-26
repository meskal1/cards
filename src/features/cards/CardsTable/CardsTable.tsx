import React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Rating from '@mui/material/Rating'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'

import { RequestStatusType } from '../../../app/appSlice'
import { TableBodySkeleton } from '../../../common/components/CustomSkeletons/TableBodySkeleton/TableBodySkeleton'
import {
  CustomTableHead,
  HeadType,
} from '../../../common/components/CustomTableHead/CustomTableHead'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { ServerOrderType, TableOrder, TableOrderType } from '../../packs/PacksTable/PacksTable'
import {
  AppCardType,
  deleteCardTC,
  SortValuesCardsType,
  updateCardsQueryParamsTC,
  updateCardTC,
  UpdateCardType,
} from '../cardsSlice'

import { CardsActionCell } from './CardsActionCell/CardsActionCell'
import s from './CardsTable.module.scss'

export type CardsOrderByType = 'question' | 'answer' | 'updated' | 'grade'

const heads: HeadType<CardsOrderByType>[] = [
  { id: 'question', label: 'Question' },
  { id: 'answer', label: 'Answer' },
  { id: 'updated', label: 'Last updated' },
  { id: 'grade', label: 'Grade' },
]

type CardsTablePropsType = {
  isMine: boolean
}

export const CardsTable: React.FC<CardsTablePropsType> = ({ isMine }) => {
  const status = useAppSelector<RequestStatusType>(state => state.cards.status)
  const tableData = useAppSelector<AppCardType[]>(state => state.cards.tableData) // Replace to value from redux
  const serverSort = useAppSelector<SortValuesCardsType>(state => state.cards.queryParams.sortCards)

  const dispatch = useAppDispatch()

  const openCardHandler = (id: string, requestStatus: RequestStatusType) => {
    if (requestStatus === 'loading') return

    alert('Open card - ' + id)
  }

  // Check current order
  const serverOrder = serverSort.slice(0, 1) as ServerOrderType
  const tableOrderBy = serverSort.slice(1) as CardsOrderByType
  const tableOrder: TableOrderType = serverOrder === TableOrder.asc ? 'asc' : 'desc'

  const handleSetSort = (property: CardsOrderByType) => {
    const isAsc = tableOrderBy === property && tableOrder === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'

    const newServerOrder: SortValuesCardsType = `${TableOrder[newOrder]}${property}`

    dispatch(updateCardsQueryParamsTC({ sortCards: newServerOrder }))
  }
  const handleEditCard = (data: UpdateCardType) => {
    dispatch(updateCardTC(data))
  }
  const handleDeleteCard = (id: string) => {
    dispatch(deleteCardTC(id))
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
            {status === 'loading' ? (
              <TableBodySkeleton columnsCount={heads.length + 1} rowsCount={10} />
            ) : (
              <TableBody>
                {tableData.map(row => {
                  return (
                    <TableRow
                      key={row._id}
                      hover={row.requestStatus === 'idle'}
                      className={s.row}
                      onClick={() => openCardHandler(row._id, row.requestStatus)}
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
                        <CardsActionCell
                          isAllDisabled={row.requestStatus === 'loading'}
                          onEdit={() =>
                            handleEditCard({ id: row._id, question: 'updated', answer: 'updates' })
                          }
                          onDelete={() => handleDeleteCard(row._id)}
                        />
                      )}
                    </TableRow>
                  )
                })}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
