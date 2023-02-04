import { useCallback, useEffect, useState } from 'react'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { getQueryParams } from '../../utils/getQueryParams'

import { AddEditPack } from './Modals/AddEditPack/AddEditPack'
import s from './Packs.module.scss'
import { getPacksTC } from './packsSlice'
import { PacksTable } from './PacksTable/PacksTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const allParams = getQueryParams()
  const [openModal, setOpenModal] = useState(false)

  const handleToggleModal = useCallback(() => setOpenModal(!openModal), [openModal])

  useEffect(() => {
    if (Object.keys(allParams).length === 0) {
      dispatch(getPacksTC())
    }
  }, [])

  return (
    <div className={s.packsContainer}>
      <div className={s.packs__controlBlock}>
        <PageTitleBlock buttonClick={handleToggleModal} />
        <CustomSearch />
      </div>
      <PacksTable />
      <CustomPagination />

      {openModal && <AddEditPack isOpened={openModal} onClose={handleToggleModal} />}
    </div>
  )
}
