import { ChangeEvent, FC } from 'react'

import Pagination from '@mui/material/Pagination'
import TablePagination from '@mui/material/TablePagination'

import { RequestStatusType } from '../../../app/appSlice'
import { setCardsQueryParams } from '../../../features/cards/cardsSlice'
import { setPacksQueryParams } from '../../../features/packs/packsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useMediaQuery } from '../../../hooks/useMediaQuery'

import s from './CustomPagination.module.scss'

type CustomPaginationType = {
  forCards?: boolean
}

export const CustomPagination: FC<CustomPaginationType> = ({ forCards = false }) => {
  const dispatch = useAppDispatch()
  const isDataLoading = useAppSelector<RequestStatusType>(state =>
    forCards ? state.cards.status : state.packs.status
  )
  const pagePacks = useAppSelector(state => state.packs.queryParams.page)
  const pageCards = useAppSelector(state => state.cards.queryParams.page)
  const pageCountPacks = useAppSelector(state => state.packs.queryParams.pageCount)
  const pageCountCards = useAppSelector(state => state.cards.queryParams.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsData.cardsTotalCount)
  const packsTotalCount = useAppSelector(state => state.packs.packsData.cardPacksTotalCount)
  const page = forCards ? pageCards : pagePacks
  const rowsPerPage = forCards ? pageCountCards : pageCountPacks
  const paginationCount = Math.ceil(
    forCards ? cardsTotalCount / pageCountCards : packsTotalCount / pageCountPacks
  )
  const showTablePagination = forCards ? cardsTotalCount > 4 : packsTotalCount > 4
  const matches599 = useMediaQuery('(max-width: 599px)')
  const matches472 = useMediaQuery('(max-width: 472px)')
  const matches374 = useMediaQuery('(max-width: 374px)')

  const dispatchData = (data: { [key: string]: number }) => {
    if (forCards) {
      dispatch(setCardsQueryParams(data))
    } else {
      dispatch(setPacksQueryParams(data))
    }
  }

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => dispatchData({ page })

  const handleChangeRowsPerPage = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatchData({ pageCount: +e.target.value, page: 1 })
  }

  return (
    <div className={s.paginationContainer}>
      {paginationCount <= 1 ? null : (
        <Pagination
          disabled={isDataLoading === 'loading'}
          count={paginationCount}
          shape="circular"
          color="primary"
          onChange={handleChangePage}
          page={page}
          size={matches374 ? 'small' : 'medium'}
          hidePrevButton={matches599}
          hideNextButton={matches599}
        />
      )}
      {showTablePagination ? (
        <TablePagination
          className={s.paginationTable}
          component="div"
          labelRowsPerPage={matches472 ? '' : 'Rows per page'}
          labelDisplayedRows={() => ``}
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
