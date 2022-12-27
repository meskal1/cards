import * as React from 'react'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch } from '../../hooks/reduxHooks'

import { PackOwnerSwitcher } from './PackOwnerSwitcher/PackOwnerSwitcher'
import s from './Packs.module.scss'
import { PackSlider } from './PackSlider/PackSlider'
import { PacksResetFilter } from './PacksResetFilter/PacksResetFilter'
import { updatePacksQueryParamsTC, addPackTC, PacksQueryParamsType } from './packsSlice'
import { PacksTable } from './PacksTable/PacksTable'

export const Packs = () => {
  console.log('render paks')
  const dispatch = useAppDispatch()
  const [showChildren, setShowChildren] = React.useState(false)

  const handleTitleButton = () => {
    dispatch(addPackTC({ name: 'NEW PACK', private: false }))
  }

  React.useEffect(() => {
    const paramsArray = window.location.toString().split('?')[1]
    let allParams = {} as PacksQueryParamsType

    if (paramsArray) {
      allParams = Object.fromEntries(
        paramsArray.split('&').map(el => [el.split('=')[0], decodeURIComponent(el.split('=')[1])])
      )
    }

    ;(async () => {
      const isSucceeded = await dispatch(updatePacksQueryParamsTC(allParams))

      if (isSucceeded) {
        setShowChildren(true)
      }
    })()
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
