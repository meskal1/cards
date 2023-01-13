import { useEffect, useState } from 'react'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { CustomModalDialog } from '../../common/components/ModalDialog/CustomModalDialog'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { getQueryParams } from '../../utils/getQueryParams'

import { AddPack } from './Modals/AddPack/AddPack'
import { DeletePack } from './Modals/DeletePack/DeletePack'
import { PackOwnerSwitcher } from './PackOwnerSwitcher/PackOwnerSwitcher'
import s from './Packs.module.scss'
import { PackSlider } from './PackSlider/PackSlider'
import { PacksResetFilter } from './PacksResetFilter/PacksResetFilter'
import { getPacksTC, UpdatePackDataType } from './packsSlice'
import { PacksTable } from './PacksTable/PacksTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const allParams = getQueryParams()
  const [addModal, setAddModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteData, setDeleteData] = useState<Omit<UpdatePackDataType, 'deckCover'>>({
    id: '',
    name: '',
  })

  const handleOpenAddModal = () => {
    setAddModal(true)
    document.body.style.overflow = 'hidden'
  }

  useEffect(() => {
    if (Object.keys(allParams).length === 0) {
      dispatch(getPacksTC())
    }
  }, [])

  return (
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
      <PacksTable openDeleteModal={setDeleteModal} setDeleteData={setDeleteData} />
      <CustomPagination />
      {addModal ? (
        <CustomModalDialog active={addModal} setActive={setAddModal}>
          <AddPack activeModal={setAddModal}></AddPack>
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
  )
}
