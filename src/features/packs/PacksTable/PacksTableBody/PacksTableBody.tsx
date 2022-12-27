import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { createSearchParams, useNavigate } from 'react-router-dom'

import { RequestStatusType } from '../../../../app/appSlice'
import { HeadType } from '../../../../common/components/CustomTableHead/CustomTableHead'
import { PATH } from '../../../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { AppPackType, deletePackTC, UpdatePackDataType, updatePackTC } from '../../packsSlice'
import { PacksOrderByType } from '../PacksTable'

import { PacksActionCell } from './PacksActionCell/PacksActionCell'
import s from './PacksTableBody.module.scss'

type PacksTableBodyType = {
  heads: HeadType<PacksOrderByType>[]
}

export const PacksTableBody: React.FC<PacksTableBodyType> = ({ heads }) => {
  const tableData = useAppSelector<AppPackType[]>(state => state.packs.tableData)
  const userId = useAppSelector(state => state.profile.userData.id)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleOpenCardPack = (id: string, requestStatus: RequestStatusType) => {
    if (requestStatus === 'loading') return

    navigate({
      pathname: PATH.CARDS,
      search: createSearchParams({ cardsPack_id: id }).toString(),
    })
  }

  const handleStudyCardPack = () => alert('study card')
  const handleEditCardPack = (data: UpdatePackDataType) => {
    dispatch(updatePackTC(data))
  }
  const handleDeleteCardPack = (id: string) => {
    dispatch(deletePackTC(id))
  }

  return (
    <TableBody>
      {tableData.map(row => {
        return (
          <TableRow
            className={s.row}
            key={row._id}
            hover={row.requestStatus === 'idle'}
            onClick={() => handleOpenCardPack(row._id, row.requestStatus)}
          >
            {heads.map(h => {
              return (
                <TableCell key={h.id}>
                  <p className={s.tableCellText}>
                    {h.id === 'updated' ? dayjs(row[h.id]).format('DD.MM.YYYY') : row[h.id]}
                  </p>
                </TableCell>
              )
            })}
            <PacksActionCell
              isMine={row.user_id === userId}
              isStudyDisabled={row.cardsCount === 0}
              isAllDisabled={row.requestStatus === 'loading'}
              onStudy={handleStudyCardPack}
              onEdit={() => handleEditCardPack({ id: row._id, name: 'updated name' })}
              onDelete={() => handleDeleteCardPack(row._id)}
            />
          </TableRow>
        )
      })}
    </TableBody>
  )
}
