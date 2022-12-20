import * as React from 'react'

import TableCell from '@mui/material/TableCell'

export const tableHeadCreator = (data: Array<string>) =>
  data.map((item, i) =>
    i > 0 ? (
      <TableCell align="right" key={item}>
        {item}
      </TableCell>
    ) : (
      <TableCell key={item}>{item}</TableCell>
    )
  )
