import { FC, useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import { useSearchParams } from 'react-router-dom'

import { RequestStatusType } from '../../../app/appSlice'
import { CustomModalDialog } from '../../../common/components/CustomModalDialog/CustomModalDialog'
import { TableBodySkeleton } from '../../../common/components/CustomSkeletons/TableBodySkeleton/TableBodySkeleton'
import {
  CustomTableHead,
  HeadType,
} from '../../../common/components/CustomTableHead/CustomTableHead'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useGetSearchParams } from '../../../hooks/useGetSearchParams'
import { ServerOrderType, TableOrder, TableOrderType } from '../../packs/PacksTable/PacksTable'
import { getCardsTC, setCardsQueryParams, SortValuesCardsType, UpdateCardType } from '../cardsSlice'
import { DeleteCard } from '../Modals/DeleteCard/DeleteCard'
import { EditCard } from '../Modals/EditCard/EditCard'

import { CardsTableBody } from './CardsTableBody/CardsTableBody'

export type CardsOrderByType = 'question' | 'answer' | 'updated' | 'grade'

const heads: HeadType<CardsOrderByType>[] = [
  { id: 'question', label: 'Question' },
  { id: 'answer', label: 'Answer' },
  { id: 'updated', label: 'Last updated' },
  { id: 'grade', label: 'Grade' },
]

type CardsTablePropsType = {
  isMine: boolean
}

export const CardsTable: FC<CardsTablePropsType> = ({ isMine }) => {
  const status = useAppSelector<RequestStatusType>(state => state.app.tableStatus)
  const serverSort = useAppSelector<SortValuesCardsType>(state => state.cards.queryParams.sortCards)
  const pageCount = useAppSelector(state => state.cards.queryParams.pageCount)
  const queryParams = useAppSelector(state => state.cards.queryParams)
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = useGetSearchParams()
  const [openDeleteCard, setOpenDeleteCard] = useState(false)
  const [deleteData, setDeleteData] = useState('')
  const [openEditCard, setOpenEditCard] = useState(false)
  const [editData, setEditData] = useState<UpdateCardType>({
    id: '',
    answer: '',
    question: '',
    questionImg: '',
  })

  const serverOrder = serverSort.slice(0, 1) as ServerOrderType
  const tableOrderBy = serverSort.slice(1) as CardsOrderByType
  const tableOrder: TableOrderType = serverOrder === TableOrder.asc ? 'asc' : 'desc'

  const handleSetSort = (property: CardsOrderByType) => {
    const isAsc = tableOrderBy === property && tableOrder === 'asc'
    const newOrder = isAsc ? 'desc' : 'asc'

    const newServerOrder: SortValuesCardsType = `${TableOrder[newOrder]}${property}`

    setSearchParams({ ...allParams, sortCards: newServerOrder })
    dispatch(setCardsQueryParams({ sortCards: newServerOrder }))
  }

  useEffect(() => {
    dispatch(getCardsTC())
  }, [queryParams])

  return (
    <>
      <Box>
        <Paper>
          <TableContainer>
            <Table>
              <CustomTableHead
                heads={heads}
                order={tableOrder}
                orderBy={tableOrderBy}
                onSetSort={handleSetSort}
                withActions={isMine}
              />
              {status === 'loading' ? (
                <TableBodySkeleton
                  columnsCount={heads.length}
                  rowsCount={pageCount}
                  withActions={isMine}
                />
              ) : (
                <CardsTableBody
                  heads={heads}
                  isMine={isMine}
                  openEdit={setOpenEditCard}
                  setEditData={setEditData}
                  openDelete={setOpenDeleteCard}
                  setDeleteData={setDeleteData}
                />
              )}
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      {openEditCard && (
        <CustomModalDialog open={openEditCard} closeModal={setOpenEditCard}>
          <EditCard closeModal={setOpenEditCard} cardsData={editData} active={openEditCard} />
        </CustomModalDialog>
      )}
      {openDeleteCard && (
        <CustomModalDialog open={openDeleteCard} closeModal={setOpenDeleteCard}>
          <DeleteCard activeModal={setOpenDeleteCard} id={deleteData} />
        </CustomModalDialog>
      )}
    </>
  )
}
