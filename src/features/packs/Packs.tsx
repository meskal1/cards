import * as React from 'react'

import { useSearchParams } from 'react-router-dom'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

import { PackOwnerSwitcher } from './PackOwnerSwitcher/PackOwnerSwitcher'
import s from './Packs.module.scss'
import { PackSlider } from './PackSlider/PackSlider'
import { PacksResetFilter } from './PacksResetFilter/PacksResetFilter'
import { getPacksTC } from './packsSlice'

type PacksType = {}

export const Packs: React.FC<PacksType> = ({}) => {
  const dispatch = useAppDispatch()
  //   const isInitialized = useAppSelector(state => state.app.isInitialized)
  //   const [searchParams, setSearchParams] = useSearchParams()

  const handleTitleButton = () => {
    // dispatch() Add new pack
  }

  React.useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  return (
    <>
      <div className={s.packsContainer}>
        <div className={s.packs__controlBlock}>
          <PageTitleBlock
            title={'packs list'}
            button={'add new pack'}
            buttonClick={handleTitleButton}
          />
          <div className={s.packs__controlPanel}>
            <CustomSearch />
            <PackOwnerSwitcher />
            <PackSlider />
            <PacksResetFilter />
          </div>
        </div>
        <div className={s.packs__table}>packs table</div>
        <CustomPagination />
      </div>
    </>
  )
}
