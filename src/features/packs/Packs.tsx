import * as React from 'react'

import { useSearchParams } from 'react-router-dom'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getSearchParams } from '../../utils/getAllSearchParams'

import { PackOwnerSwitcher } from './PackOwnerSwitcher/PackOwnerSwitcher'
import s from './Packs.module.scss'
import { PackSlider } from './PackSlider/PackSlider'
import { PacksResetFilter } from './PacksResetFilter/PacksResetFilter'
import { getPacksTC } from './packsSlice'
import { PacksTable } from './PacksTable/PacksTable'

type PacksType = {}

export const Packs: React.FC<PacksType> = ({}) => {
  console.log('render packs')
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = getSearchParams(searchParams)

  const setQueryParams = (param: string, value: string) => {
    //  if (value) {
    //    setSearchParams({ ...allParams, [param]: value })
    //  } else {
    //  }
  }

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
            <CustomSearch customSearchParams={setQueryParams} />
            <PackOwnerSwitcher />
            <PackSlider />
            <PacksResetFilter />
          </div>
        </div>
        <PacksTable />
        <CustomPagination />
      </div>
    </>
  )
}
