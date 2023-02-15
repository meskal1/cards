import { FC } from 'react'

import { CardsOrderByType } from '../../../features/cards/CardsTable/CardsTable'
import { PacksOrderByType } from '../../../features/packs/PacksTable/PacksTable'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { SortValuesType } from '../SortTableItems/SortTableItems'

import s from './CustomTableHead.module.scss'

export type TableHeadType<T> = {
  id: T
  label: string
}

type CustomTableHeadPropsType = {
  heads: TableHeadType<PacksOrderByType | CardsOrderByType>[]
  forCards?: boolean
  withActions?: boolean
}

export const CustomTableHead: FC<CustomTableHeadPropsType> = ({
  heads,
  forCards = false,
  withActions = false,
}) => {
  const serverSort = useAppSelector<SortValuesType>(state => {
    return forCards ? state.cards.queryParams.sortCards : state.packs.queryParams.sortPacks
  })
  const serverOrder = serverSort.slice(0, 1)
  const tableOrderBy = serverSort.slice(1)
  const arrowOrderStyle = +serverOrder ? s.sortArrowUp : s.sortArrowDown

  return (
    <thead className={s.tablePacks__head}>
      <tr className={s.tablePacks__headRow}>
        {heads.map(el => {
          return (
            <th
              key={el.id}
              className={el.label === 'Grade' ? s.gradeCell : s.tablePacks__headCell}
              scope="col"
            >
              <div className={s.headCellContainer}>
                <span
                  className={`${s.headCellTitle} ${tableOrderBy === el.id ? arrowOrderStyle : ''}`}
                >
                  {el.label}
                </span>
              </div>
            </th>
          )
        })}
        <th className={withActions ? s.tablePacks__headCell : s.actionCell} scope="col"></th>
      </tr>
    </thead>
  )
}
