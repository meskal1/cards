import { RequestStatusType } from '../../../app/appSlice'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { clearPacksQueryParams } from '../packsSlice'

import s from './PacksResetFilter.module.scss'

export const PacksResetFilter = () => {
  const dispatch = useAppDispatch()
  const isDataLoading = useAppSelector<RequestStatusType>(state => state.packs.status)

  const handleResetFilter = () => {
    if (isDataLoading === 'idle') {
      dispatch(clearPacksQueryParams())
    }
  }

  return (
    <div className={s.packsResetFilter} onClick={handleResetFilter}>
      Reset
    </div>
  )
}
