import React from 'react'

import Rating from '@mui/material/Rating'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'

import { RequestStatusType } from '../../../../app/appSlice'
import { HeadType } from '../../../../common/components/CustomTableHead/CustomTableHead'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { AppCardType, deleteCardTC, updateCardTC, UpdateCardType } from '../../cardsSlice'
import { CardsOrderByType } from '../CardsTable'

import { CardsActionCell } from './CardsActionCell/CardsActionCell'
import s from './CardsTableBody.module.scss'

type CardsTableBodyType = {
  heads: HeadType<CardsOrderByType>[]
  isMine: boolean
}

export const CardsTableBody: React.FC<CardsTableBodyType> = ({ heads, isMine }) => {
  const tableData = useAppSelector<AppCardType[]>(state => state.cards.tableData)

  const dispatch = useAppDispatch()

  const openCardHandler = (id: string, requestStatus: RequestStatusType) => {
    if (requestStatus === 'loading') return

    alert('Open card - ' + id)
  }

  const handleEditCard = (data: UpdateCardType) => {
    dispatch(updateCardTC(data))
  }
  const handleDeleteCard = (id: string) => {
    dispatch(deleteCardTC(id))
  }

  return (
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
                      {h.id === 'updated' ? dayjs(row[h.id]).format('DD.MM.YYYY') : row[h.id]}
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
  )
}
