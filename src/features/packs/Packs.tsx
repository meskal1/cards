import { useCallback, useEffect, useState } from 'react'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { LoadingProgress } from '../../common/components/LoadingProgress/LoadingProgress'
import { CustomModalDialog } from '../../common/components/ModalDialog/CustomModalDialog'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { useGetSearchParams } from '../../hooks/useGetSearchParams'

import { DeletePack, PackDeleteDataType } from './deletePack/DeletePack'
import { AddPack } from './Modals/AddPack/AddPack'
import { EditPack } from './Modals/EditPack/EditPack'
import { PackOwnerSwitcher } from './PackOwnerSwitcher/PackOwnerSwitcher'
import s from './Packs.module.scss'
import { PackSlider } from './PackSlider/PackSlider'
import { PacksResetFilter } from './PacksResetFilter/PacksResetFilter'
import { UpdatePackDataType, updatePacksQueryParamsTC } from './packsSlice'
import { PacksTable } from './PacksTable/PacksTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const [showChildren, setShowChildren] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteData, setDeleteData] = useState<PackDeleteDataType>({ id: '', name: '' })
  const [editData, setEditData] = useState<UpdatePackDataType>({ id: '', name: '' })
  const allParams = useGetSearchParams()

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
  }, [])

  return (
    <>
      {showChildren ? (
        <div className={s.packsContainer}>
          <div className={s.packs__controlBlock}>
            <PageTitleBlock
              title={'packs list'}
              button={'add new pack'}
              buttonClick={setAddModal}
            />
            <div className={s.packs__controlPanel}>
              <CustomSearch />
              <PackOwnerSwitcher />
              <PackSlider />
              <PacksResetFilter />
            </div>
          </div>
          <PacksTable
            setEditData={handleSetEditData}
            openEditModal={setEditModal}
            openDeleteModal={setDeleteModal}
            setDeleteData={setDeleteData}
          />
          <CustomPagination />
          {addModal ? (
            <CustomModalDialog active={addModal} setActive={setAddModal}>
              <AddPack activeModal={setAddModal}></AddPack>
            </CustomModalDialog>
          ) : (
            ''
          )}
          {editModal ? (
            <CustomModalDialog active={editModal} setActive={setEditModal}>
              <EditPack data={editData} activeModal={setEditModal} />
            </CustomModalDialog>
          ) : (
            ''
          )}
          {deleteModal ? (
            <CustomModalDialog active={deleteModal} setActive={setDeleteModal}>
              <DeletePack packData={deleteData} activeModal={setDeleteModal} />
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
