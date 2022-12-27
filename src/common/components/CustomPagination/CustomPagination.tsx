import * as React from 'react'

import Pagination from '@mui/material/Pagination'
import TablePagination from '@mui/material/TablePagination'
import { useSearchParams } from 'react-router-dom'

import { updateCardsQueryParamsTC } from '../../../features/cards/cardsSlice'
import { updatePacksQueryParamsTC } from '../../../features/packs/packsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { getSearchParams } from '../../../utils/getSearchParams'

import s from './CustomPagination.module.scss'

type CustomPaginationType = {
  cards?: boolean
}

export const CustomPagination: React.FC<CustomPaginationType> = React.memo(({ cards }) => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = getSearchParams(searchParams)
  const pagePacks = useAppSelector(state => state.packs.queryParams.page)
  const pageCards = useAppSelector(state => state.cards.queryParams.page)
  const pageCountPacks = useAppSelector(state => state.packs.queryParams.pageCount)
  const pageCountCards = useAppSelector(state => state.cards.queryParams.pageCount)
  const [page, setPage] = React.useState(cards ? pageCards : pagePacks)
  const [rowsPerPage, setRowsPerPage] = React.useState(cards ? pageCountCards : pageCountPacks)

  const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
    isItWorthUpdating()
    console.log('handleChangePage: ', newPage)
  }

  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value, pageCountPacks))
    setPage(1)
    isItWorthUpdating()
  }

  const isItWorthUpdating = () => {
    if (cards) {
      console.log('CARDS page, rowsPerPage: ', page, rowsPerPage)
      dispatch(updateCardsQueryParamsTC({ page, pageCount: rowsPerPage }))
      setSearchParams({ ...allParams, page: page + '', pageCount: rowsPerPage + '' })
    } else {
      console.log('PACKS page, rowsPerPage: ', page, rowsPerPage)
      dispatch(updatePacksQueryParamsTC({ page, pageCount: rowsPerPage }))
      setSearchParams({ ...allParams, page: page + '', pageCount: rowsPerPage + '' })
    }
  }

  React.useEffect(() => {
    // const isItWorthUpdating = () => {
    //    if (cards) {
    //      if (cardQuestion !== inputValue) {
    //        dispatch(updateCardsQueryParamsTC({ page: inputValue,pageCount: }))
    //      }
    //    } else {
    //      if (search !== inputValue) {
    //        dispatch(updatePacksQueryParamsTC({ search: inputValue }))
    //      }
    //    }
    //  }
    //  if (inputValue !== search && inputValue !== '') {
    //    setSearchParams({ ...allParams, [`${cards ? 'cardQuestion' : 'search'}`]: inputValue })
    //    isItWorthUpdating()
    //  }
    //  if (debouncedValue === '' && inintInputValue) {
    //    cards ? searchParams.delete('cardQuestion') : searchParams.delete('search')
    //    setSearchParams(searchParams)
    //    isItWorthUpdating()
    //  }
  }, [])

  return (
    <>
      <div className={s.paginationContainer}>
        <Pagination
          count={10}
          shape="rounded"
          color="primary"
          //  onChange={handleChangePage}
          page={page}
        />
        <TablePagination
          className={s.paginationTable}
          component="div"
          labelRowsPerPage={'show'}
          labelDisplayedRows={() => `${cards ? 'cards' : 'packs'} per page`}
          // Количество страниц всего
          count={100}
          // Индекс текущей страницы
          page={page}
          onPageChange={handleChangePage}
          // Количество строк на страницу
          rowsPerPage={rowsPerPage}
          // Убирает стрелки пагинации
          ActionsComponent={() => null}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  )
})
