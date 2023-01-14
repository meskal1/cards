import { FC, memo } from 'react'

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
import { useAppSelector } from '../../../hooks/reduxHooks'
import { UpdateCardType } from '../cardsSlice'

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
  openEdit: (state: boolean) => void
  setEditData: (data: UpdateCardType) => void
  openDelete: (state: boolean) => void
  setDeleteData: (id: string) => void
}

export const CardsTable: FC<CardsTablePropsType> = memo(
  ({ isMine, openEdit, setEditData, openDelete, setDeleteData }) => {
    const status = useAppSelector<RequestStatusType>(state => state.cards.status)
    const pageCount = useAppSelector(state => state.cards.queryParams.pageCount)

    console.log('Render CARDS TABLE')

    return (
      <Box>
        <Paper>
          <TableContainer>
            <Table>
              <CustomTableHead heads={heads} cards withActions={isMine} />
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
                  openEdit={openEdit}
                  setEditData={setEditData}
                  openDelete={openDelete}
                  setDeleteData={setDeleteData}
                />
              )}
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    )
  }
)
