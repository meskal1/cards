import { FC, useState, MutableRefObject, useRef } from 'react'

import { PATH } from '../../../constants/routePaths.enum'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { useNavigateNoUpdates } from '../../../utils/routerUtils'
import { AddEditPack } from '../Modals/AddEditPack/AddEditPack'
import { DeletePack } from '../Modals/DeletePack/DeletePack'

import s from './PackActionsMenu.module.scss'
import { PackActionsMenuList } from './PackActionsMenuList/PackActionsMenuList'

type PackActionsMenuType = {
  deckCover?: string
  isPrivate?: boolean
  openToLeft?: boolean
  packID: string
  packName: string
  packIsEmpty: boolean
}

export const PackActionsMenu: FC<PackActionsMenuType> = ({
  deckCover,
  isPrivate = false,
  openToLeft = false,
  packID,
  packName,
  packIsEmpty,
}) => {
  const packDeckCover = useAppSelector<string | null>(state => state.cards.cardsData.packDeckCover)
  const navigate = useNavigateNoUpdates()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuSheet = isMenuOpen ? `${openToLeft ? s.openMenuLeft : s.openMenuRight}` : ''
  const initOpenModals = {
    deleteOpened: false,
    editOpened: false,
  }
  const [modals, setModals] = useState<typeof initOpenModals>(initOpenModals)
  const menuRef = useRef() as MutableRefObject<HTMLDivElement>
  const sendData = {
    id: packID,
    private: isPrivate || false,
    name: packName,
    deckCover: deckCover || packDeckCover || '',
  }

  const handleToogleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleCloseModal = () => setModals(initOpenModals)

  const handleToggleEditModal = () => setModals({ ...modals, editOpened: !modals.editOpened })

  const handleToggleDeleteModal = () => setModals({ ...modals, deleteOpened: !modals.deleteOpened })

  const handleLearn = () => {
    if (packIsEmpty) {
      navigate(PATH.LEARN + `/${packID}`)
    }
  }

  return (
    <>
      {modals.editOpened && (
        <AddEditPack isOpened={modals.editOpened} onClose={handleCloseModal} packData={sendData} />
      )}

      {modals.deleteOpened && (
        <DeletePack isOpened={modals.deleteOpened} onClose={handleCloseModal} packData={sendData} />
      )}

      <div
        ref={menuRef}
        className={`${s.menuContainer} ${menuSheet}`}
        onMouseDown={handleToogleMenu}
      >
        {isMenuOpen && (
          <PackActionsMenuList
            parentRef={menuRef}
            handleLearn={handleLearn}
            handleEdit={handleToggleEditModal}
            handleDelete={handleToggleDeleteModal}
            closeMenu={handleToogleMenu}
            packIsEmpty={packIsEmpty}
            openToLeft={openToLeft}
          />
        )}
      </div>
    </>
  )
}
