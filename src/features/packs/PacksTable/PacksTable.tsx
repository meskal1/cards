import { RequestStatusType } from '../../../app/appSlice'
import { packsTableLength } from '../../../app/selectors'
import { TableBodySkeleton } from '../../../common/components/CustomSkeletons/TableBodySkeleton/TableBodySkeleton'
import {
  CustomTableHead,
  TableHeadType,
} from '../../../common/components/CustomTableHead/CustomTableHead'
import { useAppSelector } from '../../../hooks/useAppSelector'

import s from './PacksTable.module.scss'
import { PacksTableBody } from './PacksTableBody/PacksTableBody'

export type PacksOrderByType = 'name' | 'cardsCount' | 'updated' | 'user_name'

const heads: TableHeadType<PacksOrderByType>[] = [
  { id: 'name', label: 'Name' },
  { id: 'user_name', label: 'Created by' },
  { id: 'cardsCount', label: 'Cards' },
  { id: 'updated', label: 'Last updated' },
]

export const PacksTable = () => {
  const status = useAppSelector<RequestStatusType>(state => state.packs.status)
  const isTableNotEmpty = useAppSelector(packsTableLength)
  const pageCount = useAppSelector(state => state.packs.queryParams.pageCount)

  return (
    <>
      {isTableNotEmpty || status === 'loading' ? (
        <table className={s.tablePacks}>
          <CustomTableHead heads={heads} withActions />
          {status === 'loading' ? (
            <TableBodySkeleton columnsCount={heads.length + 1} rowsCount={pageCount} />
          ) : (
            <PacksTableBody heads={heads} />
          )}
        </table>
      ) : (
        <p className={s.emptyTableTitle}>No packs found.</p>
      )}
    </>
  )
}
