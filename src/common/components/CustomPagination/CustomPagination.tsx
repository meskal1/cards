import * as React from 'react'

import Pagination from '@mui/material/Pagination'
import TablePagination from '@mui/material/TablePagination'
import { useSearchParams } from 'react-router-dom'

import { updateCardsQueryParamsTC } from '../../../features/cards/cardsSlice'
import { updatePacksQueryParamsTC } from '../../../features/packs/packsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useGetSearchParams } from '../../../hooks/useGetSearchParams'

import s from './CustomPagination.module.scss'

type CustomPaginationType = {
  cards?: boolean
}

export const CustomPagination: React.FC<CustomPaginationType> = ({ cards }) => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = useGetSearchParams()
  const pagePacks = useAppSelector(state => state.packs.queryParams.page)
  const pageCards = useAppSelector(state => state.cards.queryParams.page)
  const pageCountPacks = useAppSelector(state => state.packs.queryParams.pageCount)
  const pageCountCards = useAppSelector(state => state.cards.queryParams.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsData.cardsTotalCount)
  const packsTotalCount = useAppSelector(state => state.packs.cardsCount.cardPacksTotalCount)
  const [page, setPage] = React.useState(cards ? pageCards : pagePacks)
  const [rowsPerPage, setRowsPerPage] = React.useState(cards ? pageCountCards : pageCountPacks)
  const paginationCount = Math.ceil(
    cards ? cardsTotalCount / pageCountCards : packsTotalCount / pageCountPacks
  )

  const handleChangePage = (event: React.ChangeEvent<any>, page: number) => {
    setPage(page)

    if (cards) {
      dispatch(updateCardsQueryParamsTC({ page }))
      setSearchParams({ ...allParams, page: page + '' })
    } else {
      dispatch(updatePacksQueryParamsTC({ page }))
      setSearchParams({ ...allParams, page: page + '' })
    }
  }

  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value))

    if (cards) {
      dispatch(updateCardsQueryParamsTC({ pageCount: +e.target.value }))
      setSearchParams({ ...allParams, pageCount: e.target.value })
    } else {
      dispatch(updatePacksQueryParamsTC({ pageCount: +e.target.value }))
      setSearchParams({ ...allParams, pageCount: e.target.value })
    }
  }

  React.useEffect(() => {}, [])

  return (
    <>
      <div className={s.paginationContainer}>
        {paginationCount === 1 ? null : (
          <Pagination
            count={paginationCount}
            shape="rounded"
            color="primary"
            onChange={handleChangePage}
            page={page}
          />
        )}
        <TablePagination
          className={s.paginationTable}
          component="div"
          labelRowsPerPage={'show'}
          labelDisplayedRows={() => `${cards ? 'cards' : 'packs'} per page`}
          // Количество страниц всего
          count={101}
          // Индекс текущей страницы
          page={page === -1 ? 0 : 1}
          onPageChange={() => {}}
          // Количество строк на страницу
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[4, 8, 12, 16, 30, 50, 100]}
          // Убирает стрелки пагинации
          ActionsComponent={() => null}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  )
}
