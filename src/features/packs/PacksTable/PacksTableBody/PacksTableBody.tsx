import { FC } from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import dayjs from 'dayjs'

import { RequestStatusType } from '../../../../app/appSlice'
import cover from '../../../../assets/img/cover.png'
import { HeadType } from '../../../../common/components/CustomTableHead/CustomTableHead'
import { PATH } from '../../../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { useNavigateNoUpdates } from '../../../../utils/routerUtils'
import { PackDeleteDataType } from '../../Modals/DeletePack/DeletePack'
import { AppPackType, setBrokenImages, UpdatePackDataType } from '../../packsSlice'
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

export const PacksTableBody: FC<PacksTableBodyType> = ({
  heads,
  setEditData,
  openEditModal,
  openDeleteModal,
  setDeleteData,
}) => {
  const tableData = useAppSelector<AppPackType[]>(state => state.packs.tableData)
  const userId = useAppSelector(state => state.profile.userData.id)
  const brokenImages = useAppSelector(state => state.packs.brokenImages)
  const dispatch = useAppDispatch()
  const navigate = useNavigateNoUpdates()

  const handleOpenCardPack = (id: string, requestStatus: RequestStatusType) => {
    if (requestStatus === 'loading') return
    navigate(PATH.CARDS + `/${id}`)
  }

  const handleStudyCardPack = (id: string) => navigate(PATH.LEARN + `/${id}`)

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
                <TableCell className={s.tableCell} key={h.id}>
                  <div className={`${s.cellContainer} ${s.tableCellText}`}>
                    {h.id === 'name' &&
                      !!row.deckCover &&
                      !brokenImages.includes(row.deckCover) && (
                        <div className={s.packImageWrapper}>
                          <img
                            src={row.deckCover ? row.deckCover : cover}
                            alt="deckCover"
                            className={s.packImage}
                            onError={({}) => {
                              dispatch(setBrokenImages(row.deckCover))
                            }}
                          />
                        </div>
                      )}
                    {h.id === 'updated' ? (
                      <p>{dayjs(row[h.id]).format('DD.MM.YYYY')}</p>
                    ) : (
                      <p
                        className={
                          h.id === 'name' && row.deckCover && !brokenImages.includes(row.deckCover)
                            ? s.packName
                            : undefined
                        }
                      >
                        {row[h.id]}
                      </p>
                    )}
                  </div>
                </TableCell>
              )
            })}
            <PacksActionCell
              isMine={row.user_id === userId}
              isStudyDisabled={row.cardsCount === 0}
              isAllDisabled={row.requestStatus === 'loading'}
              onStudy={() => handleStudyCardPack(row._id)}
              onEdit={() =>
                handleEditCardPack({
                  id: row._id,
                  name: row.name,
                  deckCover: row.deckCover ? row.deckCover : '',
                })
              }
              onDelete={() => handleDeleteCardPack({ id: row._id, name: row.name })}
            />
          </TableRow>
        )
      })}
    </TableBody>
  )
}
