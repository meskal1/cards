import * as React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

import { RequestStatusType, setAppStatus } from '../../../../app/appSlice'
import { HeadType } from '../../../../common/components/CustomTableHead/CustomTableHead'
import { PATH } from '../../../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { getCards } from '../../../learn/learnSlice'
import { PackDeleteDataType } from '../../deletePack/DeletePack'
import { AppPackType, deletePackTC, UpdatePackDataType } from '../../packsSlice'
import { PacksOrderByType } from '../PacksTable'

import { PacksActionCell } from './PacksActionCell/PacksActionCell'
import s from './PacksTableBody.module.scss'

type PacksTableBodyType = {
  heads: HeadType<PacksOrderByType>[]
  openEditModal: () => void
  setEditData: (data: UpdatePackDataType) => void
  openDeleteModal: (state: boolean) => void
  setDeleteData: (data: PackDeleteDataType) => void
}

export const PacksTableBody: React.FC<PacksTableBodyType> = ({
  heads,
  setEditData,
  openEditModal,
  openDeleteModal,
  setDeleteData,
}) => {
  const tableData = useAppSelector<AppPackType[]>(state => state.packs.tableData)
  const userId = useAppSelector(state => state.profile.userData.id)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleOpenCardPack = (id: string, requestStatus: RequestStatusType) => {
    if (requestStatus === 'loading') return
    navigate(PATH.CARDS + `/${id}`)
  }

  const handleStudyCardPack = async (id: string) => {
    await dispatch(setAppStatus({ status: 'loading' }))
    navigate(PATH.LEARN + `/${id}`)
  }
  const handleEditCardPack = (data: UpdatePackDataType) => {
    setEditData(data)
    openEditModal()
  }
  const handleDeleteCardPack = (data: PackDeleteDataType) => {
    setDeleteData(data)
    openDeleteModal(true)
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
              onStudy={() => handleStudyCardPack(row._id)}
              onEdit={() => handleEditCardPack({ id: row._id, name: row.name })}
              onDelete={() => handleDeleteCardPack({ id: row._id, name: row.name })}
            />
          </TableRow>
        )
      })}
    </TableBody>
  )
}
