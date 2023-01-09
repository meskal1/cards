import { useEffect, useState } from 'react'

import { CustomModalDialog } from '../../common/components/CustomModalDialog/CustomModalDialog'
import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { LoadingProgress } from '../../common/components/LoadingProgress/LoadingProgress'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { useGetSearchParams } from '../../hooks/useGetSearchParams'

import { AddPack } from './Modals/AddPack/AddPack'
import { PackOwnerSwitcher } from './PackOwnerSwitcher/PackOwnerSwitcher'
import s from './Packs.module.scss'
import { PackSlider } from './PackSlider/PackSlider'
import { PacksResetFilter } from './PacksResetFilter/PacksResetFilter'
import { setPacksQueryParams } from './packsSlice'
import { PacksTable } from './PacksTable/PacksTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const [showChildren, setShowChildren] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)
  const allParams = useGetSearchParams()

  useEffect(() => {
    ;(async () => {
      await dispatch(setPacksQueryParams(allParams))
      setShowChildren(true)
    })()
  }, [])

  const handleOpenAddModal = () => {
    setOpenAddModal(true)
    document.body.style.overflow = 'hidden'
  }

  return (
    <>
      {showChildren ? (
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
          {openAddModal ? (
            <CustomModalDialog open={openAddModal} closeModal={setOpenAddModal}>
              <AddPack activeModal={setOpenAddModal}></AddPack>
            </CustomModalDialog>
          ) : (
            ''
          )}
        </div>
      ) : (
        <LoadingProgress />
      )}
    </>
  )
}
