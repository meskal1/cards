import { FC, MutableRefObject, useRef, useState } from 'react'

import { AddEditCard } from '../Modals/AddEditCard/AddEditCard'
import { DeleteCard } from '../Modals/DeleteCard/DeleteCard'

import s from './CardActionsMenu.module.scss'
import { CardActionsMenuList } from './CardActionsMenuList/CardActionsMenuList'

type CardActionsMenuType = {
  cardID: string
  answer: string
  question: string
  questionImg: string
}

export const CardActionsMenu: FC<CardActionsMenuType> = ({
  cardID,
  answer,
  question,
  questionImg,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuSheet = isMenuOpen ? s.openMenuLeft : ''
  const initOpenModals = {
    deleteOpened: false,
    editOpened: false,
  }
  const [modals, setModals] = useState<typeof initOpenModals>(initOpenModals)
  const menuRef = useRef() as MutableRefObject<HTMLDivElement>
  const sendData = {
    id: cardID,
    answer: answer,
    question: question,
    questionImg: questionImg,
  }

  const handleToogleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleCloseModal = () => setModals(initOpenModals)

  const handleToggleEditModal = () => setModals({ ...modals, editOpened: !modals.editOpened })

  const handleToggleDeleteModal = () => setModals({ ...modals, deleteOpened: !modals.deleteOpened })

  return (
    <>
      {modals.editOpened && (
        <AddEditCard isOpened={modals.editOpened} onClose={handleCloseModal} cardsData={sendData} />
      )}

      {modals.deleteOpened && (
        <DeleteCard isOpened={modals.deleteOpened} id={cardID} onClose={handleCloseModal} />
      )}

      <div ref={menuRef} className={`${s.menuContainer} ${menuSheet}`} onClick={handleToogleMenu}>
        {isMenuOpen && (
          <CardActionsMenuList
            parentRef={menuRef}
            handleEdit={handleToggleEditModal}
            handleDelete={handleToggleDeleteModal}
            closeMenu={handleToogleMenu}
          />
        )}
      </div>
    </>
  )
}
