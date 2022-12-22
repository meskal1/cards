import * as React from 'react'

import { useAppDispatch } from '../../../hooks/reduxHooks'

import s from './PacksResetFilter.module.scss'

type PacksResetFilterType = {}

export const PacksResetFilter: React.FC<PacksResetFilterType> = React.memo(({}) => {
  const dispatch = useAppDispatch()

  const handleResetFilter = () => {
    // dispatch() Reset number of cards to default min=0 and max=X values
    // dispatch() Reset packs owner to All
  }

  return (
    <>
      <div className={s.packsResetFilter} onClick={handleResetFilter} />
    </>
  )
})
