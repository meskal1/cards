import { FC, useCallback, useEffect, useState } from 'react'

import { Close } from '@mui/icons-material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Typography from '@mui/material/Typography'
import { useSearchParams } from 'react-router-dom'

import { RequestStatusType } from '../../../app/appSlice'
import { TableBodySkeleton } from '../../../common/components/CustomSkeletons/TableBodySkeleton/TableBodySkeleton'
import {
  CustomTableHead,
  HeadType,
} from '../../../common/components/CustomTableHead/CustomTableHead'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useGetSearchParams } from '../../../hooks/useGetSearchParams'
import { PackDeleteDataType } from '../Modals/DeletePack/DeletePack'
import { EditPack } from '../Modals/EditPack/EditPack'
import { getPacksTC, setPacksQueryParams, SortValuesType, UpdatePackDataType } from '../packsSlice'

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
  const isDataNotEmpty = useAppSelector(state => state.packs.tableData).length
  const serverSort = useAppSelector<SortValuesType>(state => state.packs.queryParams.sortPacks)
  const pageCount = useAppSelector(state => state.packs.queryParams.pageCount)
  const queryParams = useAppSelector(state => state.packs.queryParams)
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [editData, setEditData] = useState<UpdatePackDataType>({ id: '', name: '', deckCover: '' })
  const [openEditModal, setOpenEditModal] = useState(false)
  const handleOpen = () => setOpenEditModal(true)
  const handleClose = () => setOpenEditModal(false)
  const allParams = useGetSearchParams()

  // Check current order
  const serverOrder = serverSort.slice(0, 1) as ServerOrderType
  const tableOrderBy = serverSort.slice(1) as PacksOrderByType
  const tableOrder: TableOrderType = serverOrder === TableOrder.asc ? 'asc' : 'desc'

  const handleSetSort = (property: PacksOrderByType) => {
    const isAsc = tableOrderBy === property && tableOrder === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    const newServerOrder: SortValuesType = `${TableOrder[newOrder]}${property}`

    setSearchParams({ ...allParams, sortPacks: newServerOrder })
    dispatch(setPacksQueryParams({ sortPacks: newServerOrder }))
  }

  const handleOpenEditModal = useCallback(() => {
    //openEditModal(true)
    handleOpen()
  }, [openEditModal])

  useEffect(() => {
    dispatch(getPacksTC())
  }, [queryParams])

  const handleSetEditData = useCallback(
    (data: UpdatePackDataType) => setEditData(data),
    [setEditData]
  )

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
