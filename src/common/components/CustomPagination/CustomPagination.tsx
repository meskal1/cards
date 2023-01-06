import { FC, ChangeEvent, useEffect } from 'react'

import Pagination from '@mui/material/Pagination'
import TablePagination from '@mui/material/TablePagination'
import { useSearchParams } from 'react-router-dom'

import { RequestStatusType } from '../../../app/appSlice'
import { setCardsQueryParams, updateCardsQueryParamsTC } from '../../../features/cards/cardsSlice'
import { setPacksQueryParams } from '../../../features/packs/packsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useGetSearchParams } from '../../../hooks/useGetSearchParams'

import s from './CustomPagination.module.scss'

type CustomPaginationType = {
  cards?: boolean
}

export const CustomPagination: FC<CustomPaginationType> = ({ cards }) => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = useGetSearchParams()
  const isDataLoading = useAppSelector<RequestStatusType>(state => state.app.tableStatus)
  const pagePacks = useAppSelector(state => state.packs.queryParams.page)
  const pageCards = useAppSelector(state => state.cards.queryParams.page)
  const pageCountPacks = useAppSelector(state => state.packs.queryParams.pageCount)
  const pageCountCards = useAppSelector(state => state.cards.queryParams.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsData.cardsTotalCount)
  const packsTotalCount = useAppSelector(state => state.packs.cardsCount.cardPacksTotalCount)
  const page = cards ? pageCards : pagePacks
  const rowsPerPage = cards ? pageCountCards : pageCountPacks
  const paginationCount = Math.ceil(
    cards ? cardsTotalCount / pageCountCards : packsTotalCount / pageCountPacks
  )
  const showTablePagination = cards ? cardsTotalCount > 4 : packsTotalCount > 4

  const dispatchData = (data: { [key: string]: number }) => {
    if (cards) {
      dispatch(updateCardsQueryParamsTC(data))
    } else {
      dispatch(setPacksQueryParams(data))
    }
  }

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    dispatchData({ page })

    setSearchParams({ ...allParams, page: page + '' })
  }

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatchData({ pageCount: +e.target.value })

    setSearchParams({ ...allParams, pageCount: e.target.value })
  }

  useEffect(() => {
    if (allParams.page > paginationCount) {
      setSearchParams({ ...allParams, page: paginationCount })
      if (cards) {
        dispatch(setCardsQueryParams({ page: paginationCount }))
      } else {
        dispatch(setPacksQueryParams({ page: paginationCount }))
      }
    }
  }, [allParams])

  return (
    <div className={s.paginationContainer}>
      {paginationCount <= 1 ? null : (
        <Pagination
          disabled={isDataLoading === 'loading'}
          count={paginationCount}
          shape="rounded"
          color="primary"
          onChange={handleChangePage}
          page={page}
        />
      )}
      {showTablePagination ? (
        <TablePagination
          className={s.paginationTable}
          component="div"
          labelRowsPerPage={'show'}
          labelDisplayedRows={() => `${cards ? 'cards' : 'packs'} per page`}
          count={101}
          page={page === -1 ? 0 : 1}
          onPageChange={() => {}}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[4, 8, 12, 16, 30, 50, 100]}
          ActionsComponent={() => null}
          onRowsPerPageChange={handleChangeRowsPerPage}
          SelectProps={{ disabled: isDataLoading === 'loading' }}
        />
      ) : null}
    </div>
  )
}
