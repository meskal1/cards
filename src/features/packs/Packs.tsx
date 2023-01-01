import { useCallback, useEffect, useState } from 'react'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { CustomModalDialog } from '../../common/components/ModalDialog/CustomModalDialog'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { useGetSearchParams } from '../../hooks/useGetSearchParams'

import { AddPack } from './addPack/AddPack'
import { EditPack } from './editPack/EditPack'
import { PackOwnerSwitcher } from './PackOwnerSwitcher/PackOwnerSwitcher'
import s from './Packs.module.scss'
import { PackSlider } from './PackSlider/PackSlider'
import { PacksResetFilter } from './PacksResetFilter/PacksResetFilter'
import { resetPacksQueryParams, UpdatePackDataType, updatePacksQueryParamsTC } from './packsSlice'
import { PacksTable } from './PacksTable/PacksTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const [showChildren, setShowChildren] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editData, setEditData] = useState<UpdatePackDataType>({ id: '', name: '' })
  const allParams = useGetSearchParams()

  const handleOpenAddModal = useCallback(() => setAddModal(true), [setAddModal])

  const handleCloseAddModal = useCallback(() => setAddModal(false), [setAddModal])

  const handleOpenEditModal = useCallback(() => setEditModal(true), [setEditModal])

  const handleCloseEditModal = useCallback(() => setEditModal(false), [setEditModal])

  const handleSetEditData = useCallback(
    (data: UpdatePackDataType) => setEditData(data),
    [setEditData]
  )

  useEffect(() => {
    ;(async () => {
      const isSucceeded = await dispatch(updatePacksQueryParamsTC(allParams))

      if (isSucceeded) {
        setShowChildren(true)
      }
    })()

    return () => {
      dispatch(resetPacksQueryParams())
    }
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
          <PacksTable setEditData={handleSetEditData} openEditModal={handleOpenEditModal} />
          <CustomPagination />
          {addModal ? (
            <CustomModalDialog active={addModal} setActive={handleCloseAddModal}>
              <AddPack closeModal={handleCloseAddModal}></AddPack>
            </CustomModalDialog>
          ) : (
            ''
          )}
          {editModal ? (
            <CustomModalDialog active={editModal} setActive={handleCloseEditModal}>
              <EditPack data={editData} closeModal={handleCloseEditModal} />
            </CustomModalDialog>
          ) : (
            ''
          )}
        </div>
      )}
    </>
  )
}
