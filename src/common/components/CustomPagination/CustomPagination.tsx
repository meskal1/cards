import * as React from 'react'

import Pagination from '@mui/material/Pagination'
import TablePagination from '@mui/material/TablePagination'

import s from './CustomPagination.module.scss'

type CustomPaginationType = {
  cards?: boolean
}

export const CustomPagination: React.FC<CustomPaginationType> = React.memo(({ cards }) => {
  const [page, setPage] = React.useState(2)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(e.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <div className={s.paginationContainer}>
        <Pagination count={10} shape="rounded" color="primary" />
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
