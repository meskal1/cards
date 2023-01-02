import { FC, useCallback } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { RequestStatusPayloadType } from '../../../app/appSlice'
import { TableBodySkeleton } from '../../../common/components/CustomSkeletons/TableBodySkeleton/TableBodySkeleton'
import {
  CustomTableHead,
  HeadType,
} from '../../../common/components/CustomTableHead/CustomTableHead'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { PackDeleteDataType } from '../deletePack/DeletePack'
import { SortValuesType, UpdatePackDataType, updatePacksQueryParamsTC } from '../packsSlice'

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
  openEditModal: (state: boolean) => void
  setEditData: (data: UpdatePackDataType) => void
  openDeleteModal: (state: boolean) => void
  setDeleteData: (data: PackDeleteDataType) => void
}

export const PacksTable: React.FC<PacksTablePropsType> = ({
  openEditModal,
  setEditData,
  openDeleteModal,
  setDeleteData,
}) => {
  const status = useAppSelector<RequestStatusPayloadType>(state => state.app.tableStatus)
  const isDataEmpty = useAppSelector(state => state.packs.tableData).length
  const serverSort = useAppSelector<SortValuesType>(state => state.packs.queryParams.sortPacks)
  const pageCount = useAppSelector(state => state.packs.queryParams.pageCount)
  const dispatch = useAppDispatch()

  // Check current order
  const serverOrder = serverSort.slice(0, 1) as ServerOrderType
  const tableOrderBy = serverSort.slice(1) as PacksOrderByType
  const tableOrder: TableOrderType = serverOrder === TableOrder.asc ? 'asc' : 'desc'

  const handleSetSort = (property: PacksOrderByType) => {
    const isAsc = tableOrderBy === property && tableOrder === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'
    const newServerOrder: SortValuesType = `${TableOrder[newOrder]}${property}`

    dispatch(updatePacksQueryParamsTC({ sortPacks: newServerOrder }))
  }

  const handleOpenEditModal = useCallback(() => openEditModal(true), [openEditModal])

  return (
    <>
      {isDataEmpty ? (
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
    </>
  )
}
