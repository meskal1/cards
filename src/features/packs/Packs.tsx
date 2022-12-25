import * as React from 'react'

import { useSearchParams } from 'react-router-dom'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { getSearchParams } from '../../utils/getSearchParams'

import { PackOwnerSwitcher } from './PackOwnerSwitcher/PackOwnerSwitcher'
import s from './Packs.module.scss'
import { PackSlider } from './PackSlider/PackSlider'
import { PacksResetFilter } from './PacksResetFilter/PacksResetFilter'
import { updatePacksQueryParamsTC, addPackTC } from './packsSlice'
import { PacksTable } from './PacksTable/PacksTable'

export const Packs = () => {
  console.log('render paks')
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = getSearchParams(searchParams)
  const [showChildren, setShowChildren] = React.useState(false)

  const handleTitleButton = () => {
    dispatch(addPackTC({ name: 'NEW PACK', private: false }))
  }

  React.useEffect(() => {
    setShowChildren(true)
    dispatch(updatePacksQueryParamsTC({ ...allParams }))
  }, [])

  return (
    <>
      {showChildren && (
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
          <PacksTable />
          <CustomPagination />
        </div>
      )}
    </>
  )
}
