import { useCallback, FC } from 'react'

import { CardsSortValuesType, setCardsQueryParams } from '../../../features/cards/cardsSlice'
import {
  initialPacksQueryParams,
  PacksSortValuesType,
  setPacksQueryParams,
} from '../../../features/packs/packsSlice'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { queryString } from '../../../utils/queryString'
import { CustomSelect } from '../CustomSelect/CustomSelect'

import s from './SortTableItems.module.scss'

export type SortValuesType = PacksSortValuesType | CardsSortValuesType

export type SelectType<T> = {
  id: T
  label: string
}

type SortTableItemsType = {
  forCards?: boolean
}

const packsOptions: SelectType<PacksSortValuesType>[] = [
  { id: '0name', label: 'Pack name A-z' },
  { id: '1name', label: 'Pack name Z-a' },
  { id: '0user_name', label: 'Created by A-z' },
  { id: '1user_name', label: 'Created by Z-a' },
  { id: '1cardsCount', label: 'Cards ascending' },
  { id: '0cardsCount', label: 'Cards descending' },
  { id: '1updated', label: 'Older packs' },
  { id: '0updated', label: 'Newer packs' },
]

const cardsOptions: SelectType<CardsSortValuesType>[] = [
  { id: '0question', label: 'Question A-z' },
  { id: '1question', label: 'Question Z-a' },
  { id: '0answer', label: 'Answer A-z' },
  { id: '1answer', label: 'Answer Z-a' },
  { id: '1updated', label: 'Older question' },
  { id: '0updated', label: 'Newer question' },
  { id: '0grade', label: 'Lower grade' },
  { id: '1grade', label: 'Higher grade' },
]

export const SortTableItems: FC<SortTableItemsType> = ({ forCards = false }) => {
  const dispatch = useAppDispatch()
  const packsQueryParams = useAppSelector(state => state.packs.queryParams)
  const packsQueryString = queryString(packsQueryParams, initialPacksQueryParams)
  const selectOptions = forCards ? cardsOptions : packsOptions
  const canIResetSelect =
    Object.keys(packsQueryString).length === 0 || packsQueryString === 'isMyPacks=yes'
  const serverSort = useAppSelector<SortValuesType>(state => {
    return forCards ? state.cards.queryParams.sortCards : state.packs.queryParams.sortPacks
  })

  const handleSetSort = useCallback((tableOrder: string) => {
    if (forCards) {
      dispatch(setCardsQueryParams({ sortCards: tableOrder as CardsSortValuesType }))
    } else {
      dispatch(setPacksQueryParams({ sortPacks: tableOrder as PacksSortValuesType }))
    }
  }, [])

  return (
    <div className={s.packsSortContainer}>
      <p className={s.packsSortTitle}>Sort items</p>
      <CustomSelect
        initValue={serverSort}
        reset={canIResetSelect}
        options={selectOptions}
        selectedOption={handleSetSort}
      />
    </div>
  )
}
