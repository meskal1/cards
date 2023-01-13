import { RequestStatusType } from '../../../app/appSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { clearPacksQueryParams } from '../packsSlice'

import s from './PacksResetFilter.module.scss'

export const PacksResetFilter = () => {
  const dispatch = useAppDispatch()
  const isDataLoading = useAppSelector<RequestStatusType>(state => state.app.tableStatus)

  const handleResetFilter = () => {
    if (isDataLoading === 'idle') {
      dispatch(clearPacksQueryParams())
    }
  }

  return (
    <>
      <div className={s.packsResetFilter} onClick={handleResetFilter} />
    </>
  )
}
