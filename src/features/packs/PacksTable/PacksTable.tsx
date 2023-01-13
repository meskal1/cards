import { FC, useCallback, useState } from 'react'

import { Close } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { RequestStatusType } from '../../../app/appSlice'
import { packsTableLength } from '../../../app/selectors'
import { TableBodySkeleton } from '../../../common/components/CustomSkeletons/TableBodySkeleton/TableBodySkeleton'
import {
  CustomTableHead,
  HeadType,
} from '../../../common/components/CustomTableHead/CustomTableHead'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { PackDeleteDataType } from '../Modals/DeletePack/DeletePack'
import { EditPack } from '../Modals/EditPack/EditPack'
import { setPacksQueryParams, SortValuesType, UpdatePackDataType } from '../packsSlice'

import s from './PacksTable.module.scss'
import { PacksTableBody } from './PacksTableBody/PacksTableBody'

export type PacksOrderByType = 'name' | 'cardsCount' | 'updated' | 'user_name'
export type ServerOrderType = '0' | '1'

export enum TableOrder {
  desc = '0',
  asc = '1',
}

export type TableOrderType = 'asc' | 'desc'

const heads: HeadType<PacksOrderByType>[] = [
  { id: 'name', label: 'Name' },
  { id: 'cardsCount', label: 'Cards' },
  { id: 'updated', label: 'Last Updated' },
  { id: 'user_name', label: 'Created by' },
]

type PacksTablePropsType = {
  openDeleteModal: (state: boolean) => void
  setDeleteData: (data: PackDeleteDataType) => void
}

export const PacksTable: FC<PacksTablePropsType> = ({ openDeleteModal, setDeleteData }) => {
  const status = useAppSelector<RequestStatusType>(state => state.app.tableStatus)
  const isDataNotEmpty = useAppSelector(packsTableLength)
  const serverSort = useAppSelector<SortValuesType>(state => state.packs.queryParams.sortPacks)
  const pageCount = useAppSelector(state => state.packs.queryParams.pageCount)
  const dispatch = useAppDispatch()
  const [editData, setEditData] = useState<UpdatePackDataType>({ id: '', name: '', deckCover: '' })
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpen = () => setOpenEditModal(true)
  const handleClose = () => setOpenEditModal(false)

  // Check current order
  const serverOrder = serverSort.slice(0, 1) as ServerOrderType
  const tableOrderBy = serverSort.slice(1) as PacksOrderByType
  const tableOrder: TableOrderType = serverOrder === TableOrder.asc ? 'asc' : 'desc'

  const handleSetSort = (property: PacksOrderByType) => {
    const isAsc = tableOrderBy === property && tableOrder === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    const newServerOrder: SortValuesType = `${TableOrder[newOrder]}${property}`

    dispatch(setPacksQueryParams({ sortPacks: newServerOrder }))
  }

  const handleOpenEditModal = useCallback(() => handleOpen(), [openEditModal])

  const handleSetEditData = useCallback(
    (data: UpdatePackDataType) => setEditData(data),
    [setEditData]
  )

  console.log('RENDER TABLE isDataNotEmpty: ', isDataNotEmpty)

  return (
    <>
      {isDataNotEmpty || status === 'loading' ? (
        <Box>
          <Paper>
            <TableContainer>
              <Table>
                <CustomTableHead
                  heads={heads}
                  order={tableOrder}
                  orderBy={tableOrderBy}
                  onSetSort={handleSetSort}
                  withActions={true}
                />
                {status === 'loading' ? (
                  <TableBodySkeleton columnsCount={heads.length + 1} rowsCount={pageCount} />
                ) : (
                  <PacksTableBody
                    heads={heads}
                    openEditModal={handleOpenEditModal}
                    setEditData={setEditData}
                    openDeleteModal={openDeleteModal}
                    setDeleteData={setDeleteData}
                  />
                )}
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      ) : (
        <p className={s.emptyTable}>no packs found.</p>
      )}
      {openEditModal && (
        <div>
          <Modal
            keepMounted
            open={openEditModal}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box className={s.ChildrenContainer}>
              <div className={s.Close}>
                <Close onClick={handleClose} />
              </div>
              <EditPack data={editData} activeModal={setOpenEditModal} />
            </Box>
          </Modal>
        </div>
      )}
    </>
  )
}
