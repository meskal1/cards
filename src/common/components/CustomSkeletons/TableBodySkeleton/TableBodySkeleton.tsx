import React from 'react'

import { Skeleton } from '@mui/material'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

type TableSkeletonPropsType = {
  columnsCount: number
  rowsCount: number
  withActions?: boolean
}

export const TableBodySkeleton: React.FC<TableSkeletonPropsType> = ({
  columnsCount,
  rowsCount,
  withActions = false,
}) => {
  const cells = new Array(withActions ? columnsCount + 1 : columnsCount).fill('').map((_, i) => {
    return (
      <TableCell key={i}>
        <Skeleton animation={'pulse'} height={35} />
      </TableCell>
    )
  })
  const rows = new Array(rowsCount).fill('').map((_, i) => {
    return <TableRow key={i}>{cells}</TableRow>
  })

  return <TableBody>{rows}</TableBody>
}
