import { FC } from 'react'

import Rating from '@mui/material/Rating'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router'
import { useSearchParams } from 'react-router-dom'

import { RequestStatusType } from '../../../../app/appSlice'
import cover from '../../../../assets/img/cover.png'
import { HeadType } from '../../../../common/components/CustomTableHead/CustomTableHead'
import { PATH } from '../../../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { useGetSearchParams } from '../../../../hooks/useGetSearchParams'
import { AppCardType, deleteCardTC, setCardsQueryParams, UpdateCardType } from '../../cardsSlice'
import { CardsOrderByType } from '../CardsTable'

import { CardsActionCell } from './CardsActionCell/CardsActionCell'
import s from './CardsTableBody.module.scss'

type CardsTableBodyType = {
  heads: HeadType<CardsOrderByType>[]
  isMine: boolean
  openEdit: (state: boolean) => void
  setEditData: (data: UpdateCardType) => void
  openDelete: (state: boolean) => void
  setDeleteData: (id: string) => void
}

export const CardsTableBody: FC<CardsTableBodyType> = ({
  heads,
  isMine,
  openEdit,
  setEditData,
  openDelete,
  setDeleteData,
}) => {
  const tableData = useAppSelector<AppCardType[]>(state => state.cards.tableData)
  const navigate = useNavigate()

  const openCardHandler = (id: string, packId: string, requestStatus: RequestStatusType) => {
    if (requestStatus === 'loading') return

    navigate(PATH.LEARN + `/${packId}`, { state: { cardId: id } })
  }

  const handleEditCard = (data: UpdateCardType) => {
    openEdit(true)
    setEditData(data)
  }
  const handleDeleteCard = (id: string) => {
    setDeleteData(id)
    openDelete(true)
  }

  return (
    <TableBody>
      {tableData.map(row => {
        return (
          <TableRow
            key={row._id}
            hover={row.requestStatus === 'idle'}
            className={s.row}
            onClick={() => openCardHandler(row._id, row.cardsPack_id, row.requestStatus)}
          >
            {heads.map(h => {
              return (
                <TableCell key={h.id}>
                  {h.id === 'question' && row.questionImg && (
                    <p>
                      <img
                        src={row.questionImg}
                        alt="deckCover"
                        className={s.image}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null // prevents looping
                          currentTarget.src = cover
                        }}
                      />
                    </p>
                  )}

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
                  handleEditCard({
                    id: row._id,
                    question: row.question,
                    answer: row.answer,
                    questionImg: row.questionImg,
                  })
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
