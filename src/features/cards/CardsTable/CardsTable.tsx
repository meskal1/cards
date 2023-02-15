import { FC, memo } from 'react'

import { RequestStatusType } from '../../../app/appSlice'
import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { TableBodySkeleton } from '../../../common/components/CustomSkeletons/TableBodySkeleton/TableBodySkeleton'
import {
  CustomTableHead,
  TableHeadType,
} from '../../../common/components/CustomTableHead/CustomTableHead'
import { LoadingProgress } from '../../../common/components/LoadingProgress/LoadingProgress'
import { useAppSelector } from '../../../hooks/useAppSelector'

import s from './CardsTable.module.scss'
import { CardsTableBody } from './CardsTableBody/CardsTableBody'

export type CardsOrderByType = 'question' | 'answer' | 'updated' | 'grade'

const heads: TableHeadType<CardsOrderByType>[] = [
  { id: 'question', label: 'Question' },
  { id: 'answer', label: 'Answer' },
  { id: 'grade', label: 'Grade' },
  { id: 'updated', label: 'Last updated' },
]

type CardsTablePropsType = {
  isMine: boolean
  showButton: boolean
  handleTitleButton: () => void
}

export const CardsTable: FC<CardsTablePropsType> = memo(
  ({ isMine, showButton, handleTitleButton }) => {
    const status = useAppSelector<RequestStatusType>(state => state.cards.status)
    const isTableNotEmpty = useAppSelector(state => state.cards.cardsData.cardsTotalCount)
    const pageCount = useAppSelector(state => state.cards.queryParams.pageCount)

    return (
      <>
        {isTableNotEmpty ? (
          <table className={s.tableCards}>
            <CustomTableHead heads={heads} forCards withActions={isMine} />
            {status === 'loading' ? (
              <TableBodySkeleton
                columnsCount={heads.length}
                rowsCount={pageCount}
                withActions={isMine}
              />
            ) : (
              <CardsTableBody heads={heads} isMine={isMine} />
            )}
          </table>
        ) : (
          <>
            {status === 'loading' ? (
              <LoadingProgress />
            ) : (
              <div className={s.cards__emptyBlock}>
                <h3 className={s.cards__emptyTitle}>
                  No cards found.{' '}
                  {isMine && !showButton ? 'Click add new card to fill this pack' : ''}
                </h3>

                {isMine && !showButton && (
                  <CustomButton className={s.addButton} onClick={handleTitleButton}>
                    <p>Add new card</p>
                  </CustomButton>
                )}
              </div>
            )}
          </>
        )}
      </>
    )
  }
)
