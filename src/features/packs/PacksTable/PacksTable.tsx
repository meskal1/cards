import * as React from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { RequestStatusType } from '../../../app/appSlice'
import { TableBodySkeleton } from '../../../common/components/CustomSkeletons/TableBodySkeleton/TableBodySkeleton'
import {
  CustomTableHead,
  HeadType,
} from '../../../common/components/CustomTableHead/CustomTableHead'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import {
  AppPackType,
  deletePackTC,
  SortValuesType,
  UpdatePackDataType,
  updatePacksQueryParamsTC,
} from '../packsSlice'

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
  openEditModal: () => void
  setEditData: (data: UpdatePackDataType) => void
}

// eslint-disable-next-line import/export
export function PacksTable({ openEditModal, setEditData }: PacksTablePropsType) {
  const userId = useAppSelector(state => state.profile.userData.id)
  const tableData = useAppSelector<AppPackType[]>(state => state.packs.tableData)

  const status = useAppSelector<RequestStatusType>(state => state.packs.status)

  const serverSort = useAppSelector<SortValuesType>(state => state.packs.queryParams.sortPacks)

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
  const handleStudyCardPack = () => alert('study card')
  const handleEditCardPack = (data: UpdatePackDataType) => {
    const { id, name } = data

    setEditData({ id, name })
    openEditModal()
    //dispatch(updatePackTC(data))
  }
  const handleDeleteCardPack = (id: string) => {
    dispatch(deletePackTC(id))
  }

  return (
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
              <TableBodySkeleton columnsCount={heads.length + 1} rowsCount={10} />
            ) : (
              <PacksTableBody
                heads={heads}
                openEditModal={openEditModal}
                setEditData={setEditData}
              />
            )}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
