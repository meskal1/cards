import { FC } from 'react'
export type ServerOrderType = '0' | '1'

export enum TableOrder {
  desc = '0',
  asc = '1',
}

export type TableOrderType = 'asc' | 'desc'

import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import { visuallyHidden } from '@mui/utils'

import { CardsSortValuesType, setCardsQueryParams } from '../../../features/cards/cardsSlice'
import { CardsOrderByType } from '../../../features/cards/CardsTable/CardsTable'
import { setPacksQueryParams, PacksSortValuesType } from '../../../features/packs/packsSlice'
import { PacksOrderByType } from '../../../features/packs/PacksTable/PacksTable'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

import s from './CustomTableHead.module.scss'

export type HeadType<T> = {
  id: T
  label: string
}

type CustomTableHeadPropsType = {
  heads: HeadType<PacksOrderByType | CardsOrderByType>[]
  cards?: boolean
  withActions?: boolean
}

export const CustomTableHead: FC<CustomTableHeadPropsType> = ({
  heads,
  cards = false,
  withActions = false,
}) => {
  // const serverSort = useAppSelector<PacksSortValuesType>(state => state.packs.queryParams.sortPacks)
  const serverSort = useAppSelector<PacksSortValuesType | CardsSortValuesType>(state => {
    return cards ? state.cards.queryParams.sortCards : state.packs.queryParams.sortPacks
  })
  const dispatch = useAppDispatch()

  const serverOrder = serverSort.slice(0, 1) as ServerOrderType
  const tableOrderBy = serverSort.slice(1) as PacksOrderByType | CardsOrderByType
  const tableOrder: TableOrderType = serverOrder === TableOrder.asc ? 'asc' : 'desc'

  const handleSetSort = (property: PacksOrderByType | CardsOrderByType) => {
    const isAsc = tableOrderBy === property && tableOrder === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    const newServerOrder:
      | PacksSortValuesType
      | CardsSortValuesType = `${TableOrder[newOrder]}${property}`

    if (cards) {
      dispatch(setCardsQueryParams({ sortCards: newServerOrder as CardsSortValuesType }))
    } else {
      dispatch(setPacksQueryParams({ sortPacks: newServerOrder as PacksSortValuesType }))
    }
  }

  return (
    <TableHead className={s.tableHead}>
      <TableRow>
        {heads.map(h => (
          <TableCell key={h.id}>
            <TableSortLabel
              active={tableOrderBy === h.id}
              direction={tableOrderBy === h.id ? tableOrder : 'asc'}
              onClick={() => handleSetSort(h.id)}
            >
              {h.label}
              {tableOrderBy === h.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {tableOrder === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {withActions && <TableCell>Actions</TableCell>}
      </TableRow>
    </TableHead>
  )
}
