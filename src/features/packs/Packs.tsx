import * as React from 'react'

import { useSearchParams } from 'react-router-dom'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { CustomModalDialog } from '../../common/components/ModalDialog/CustomModalDialog'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { getSearchParams } from '../../utils/getSearchParams'

import { AddPack } from './addPack/AddPack'
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

  // for modal dialog
  const [addModal, setAddModal] = React.useState(false)

  const handleOpenAddModal = React.useCallback(() => setAddModal(true), [setAddModal])
  const handleCloseAddModal = React.useCallback(() => setAddModal(false), [setAddModal])

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
              buttonClick={handleOpenAddModal}
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

          <CustomModalDialog active={addModal} setActive={handleCloseAddModal}>
            <AddPack active={addModal} closeModal={handleCloseAddModal}></AddPack>
          </CustomModalDialog>
        </div>
      )}
    </>
  )
}
