import { FC } from 'react'

import Rating from '@mui/material/Rating'
import dayjs from 'dayjs'
import isBase64 from 'is-base64'

import { RequestStatusType } from '../../../../app/appSlice'
import { TableHeadType } from '../../../../common/components/CustomTableHead/CustomTableHead'
import { PATH } from '../../../../constants/routePaths.enum'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { useNavigateNoUpdates } from '../../../../utils/routerUtils'
import { CardActionsMenu } from '../../CardActionsMenu/CardActionsMenu'
import { AppCardType } from '../../cardsSlice'
import { CardsOrderByType } from '../CardsTable'

import s from './CardsTableBody.module.scss'

type CardsTableBodyType = {
  heads: TableHeadType<CardsOrderByType>[]
  isMine: boolean
}

export const CardsTableBody: FC<CardsTableBodyType> = ({ heads, isMine }) => {
  const tableData = useAppSelector<AppCardType[]>(state => state.cards.tableData)
  const navigate = useNavigateNoUpdates()

  const handleOpenCard = (id: string, packId: string, requestStatus: RequestStatusType) => {
    if (requestStatus === 'loading') return
    navigate(PATH.LEARN + `/${packId}`, { state: { cardId: id } })
  }

  return (
    <tbody className={s.tableCards__body}>
      {tableData.map(row => {
        return (
          <tr key={row._id} className={s.tableCards__bodyRow}>
            {heads.map((h, i) => {
              const validImg = isBase64(row.questionImg, { mimeRequired: true })

              return (
                <td
                  className={s.tableCards__bodyCell}
                  scope="row"
                  key={h.id}
                  onClick={() => handleOpenCard(row._id, row.cardsPack_id, row.requestStatus)}
                >
                  <div className={s.tableCards__bodyCellContent}>
                    <div className={s.tableCards__bodyCellTitle}>
                      {i === 0 ? `${validImg ? '' : row[h.id]}` : h.label}
                    </div>

                    {h.id === 'question' && validImg && (
                      <div className={s.cardImageWrapper}>
                        <img src={row.questionImg} alt="deckCover" className={s.cardImage} />
                      </div>
                    )}

                    {h.id === 'grade' ? (
                      <Rating className={s.rating} value={row[h.id]} readOnly />
                    ) : (
                      <p
                        className={`${s.cardNameAdaptive} ${
                          h.id === 'question' && validImg ? s.cardName : ''
                        }`}
                      >
                        {h.id === 'updated' ? dayjs(row[h.id]).format('DD.MM.YYYY') : row[h.id]}
                      </p>
                    )}
                  </div>
                </td>
              )
            })}
            <td className={s.tableCards__bodyCell}>
              {isMine && (
                <CardActionsMenu
                  cardID={row._id}
                  answer={row.answer}
                  question={row.question}
                  questionImg={row.questionImg}
                />
              )}
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}
