import * as React from 'react'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { CustomModalDialog } from '../../common/components/ModalDialog/CustomModalDialog'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch } from '../../hooks/reduxHooks'

import { AddPack } from './addPack/AddPack'
// eslint-disable-next-line import/namespace
import { EditPack } from './editPack/EditPack'
import { PackOwnerSwitcher } from './PackOwnerSwitcher/PackOwnerSwitcher'
import s from './Packs.module.scss'
import { PackSlider } from './PackSlider/PackSlider'
import { PacksResetFilter } from './PacksResetFilter/PacksResetFilter'
// eslint-disable-next-line import/order
import { UpdatePackDataType, updatePacksQueryParamsTC, PacksQueryParamsType } from './packsSlice'

// eslint-disable-next-line import/namespace
import { PacksTable } from './PacksTable/PacksTable'

export const Packs = () => {
  console.log('render paks')
  const dispatch = useAppDispatch()
  const [showChildren, setShowChildren] = React.useState(false)

  // for modal dialog
  const [addModal, setAddModal] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)
  const [editData, setEditData] = React.useState<UpdatePackDataType>({ id: '', name: '' })

  const handleOpenAddModal = React.useCallback(() => setAddModal(true), [setAddModal])

  const handleCloseAddModal = React.useCallback(() => setAddModal(false), [setAddModal])

  const handleOpenEditModal = React.useCallback(() => setEditModal(true), [setEditModal])

  const handleCloseEditModal = React.useCallback(() => setEditModal(false), [setEditModal])

  const handleSetEditData = React.useCallback(
    (data: UpdatePackDataType) => setEditData(data),
    [setEditData]
  )

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
          {
            <CustomModalDialog active={addModal} setActive={handleCloseAddModal}>
              <AddPack active={addModal} closeModal={handleCloseAddModal}></AddPack>
            </CustomModalDialog>
          }
          {
            <CustomModalDialog active={editModal} setActive={handleCloseEditModal}>
              <EditPack active={editModal} data={editData} closeModal={handleCloseEditModal} />
            </CustomModalDialog>
          }
        </div>
      )}
    </>
  )
}
