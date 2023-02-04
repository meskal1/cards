import { FC } from 'react'

import { Skeleton, useMediaQuery } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import s from '../../../../features/packs/PacksTable/PacksTableBody/PacksTableBody.module.scss'
import { useLocationNoUpdates } from '../../../../utils/routerUtils'

type TableSkeletonPropsType = {
  columnsCount: number
  rowsCount: number
  withActions?: boolean
}

export const TableBodySkeleton: FC<TableSkeletonPropsType> = ({
  columnsCount,
  rowsCount,
  withActions = false,
}) => {
  const location = useLocationNoUpdates()
  const isCards = new RegExp('/cards').test(location.pathname)
  const matches599 = useMediaQuery('(max-width: 599px)')
  const colsCountCards = isCards && matches599 ? columnsCount + 1 : columnsCount

  const cells = new Array(withActions ? columnsCount + 1 : colsCountCards).fill('').map((_, i) => {
    return (
      <TableCell key={i} className={matches599 ? s.tablePacks__bodyCell : ''}>
        <Skeleton
          animation={'wave'}
          height={matches599 ? 34 : 37}
          variant={matches599 ? 'text' : 'rounded'}
        />
      </TableCell>
    )
  })

  const rows = new Array(rowsCount).fill('').map((_, i) => {
    return (
      <TableRow key={i} className={matches599 ? s.tablePacks__bodyRow : ''}>
        {cells}
      </TableRow>
    )
  })

  return <TableBody className={matches599 ? s.tablePacks__body : ''}>{rows}</TableBody>
}
