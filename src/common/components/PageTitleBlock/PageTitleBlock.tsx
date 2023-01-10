import { FC, memo, useState } from 'react'

import { Portal } from '@mui/base'
import { useNavigate, useParams } from 'react-router-dom'

import { PATH } from '../../../constants/routePaths.enum'
import { DeletePack } from '../../../features/packs/Modals/DeletePack/DeletePack'
import { EditPack } from '../../../features/packs/Modals/EditPack/EditPack'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { BackToPacks } from '../BackToPacks/BackToPacks'
import { CustomButton } from '../CustomButton/CustomButton'

import s from './PageTitleBlock.module.scss'

type PageTitleBlockType = {
  linkToPacks?: boolean
  button: string
  packDeckCover?: string | null
  title: string
  buttonClick: () => void
}

export const PageTitleBlock: FC<PageTitleBlockType> = memo(
  ({ linkToPacks, button, title, buttonClick, packDeckCover }) => {
    const { id } = useParams()
    const packUserId = useAppSelector(state => state.cards.cardsData.packUserId)
    const cardsTotalCount = useAppSelector(state => state.cards.cardsData.cardsTotalCount)
    const myId = useAppSelector(state => state.profile.userData.id)
    const isItMyPack = packUserId === myId
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [openModals, setOpenModals] = useState<number[]>([0, 0])
    const showModals = openModals.reduce((a, b) => a + b, 0)
    const sendData = {
      id: id as string,
      name: title,
      deckCover: packDeckCover ? packDeckCover : '',
    }
    const menuSheet = isMenuOpen ? s.pageTitleBlock__menuSheet : ''
    const menuItemStyle = isMenuOpen ? s.pageTitleBlock__menuItemStyle : ''
    const listStyle = `${s.menuItem} ${menuItemStyle}`
    const portalStyle = isMenuOpen ? s.portal : ''
    const portalStyleBg = showModals ? s.portalBgColor : ''

    const navigate = useNavigate()

    const handleClickButton = () => buttonClick()

    const handleToogleMenu = () => setIsMenuOpen(!isMenuOpen)

    const handleClose = () => {
      setIsMenuOpen(false)
      setOpenModals([0, 0])
      document.body.style.overflow = 'unset'
    }

    const handleLearn = () => {
      if (cardsTotalCount) {
        navigate(PATH.LEARN + `/${id}`)
      }
    }

    const handleEdit = () => {
      setOpenModals([1, 0])
      document.body.style.overflow = 'hidden'
    }

    const handleDelete = () => {
      setOpenModals([0, 1])
      document.body.style.overflow = 'hidden'
    }

    return (
      <>
        <Portal>
          <div className={portalStyle || portalStyleBg} onClick={handleClose}></div>
        </Portal>

        <div className={s.pageTitleBlockContainer}>
          {linkToPacks && <BackToPacks />}
          <div className={s.pageTitleBlock__titleBlock}>
            <h2 className={s.pageTitleBlock__title}>{title}</h2>
            {isItMyPack && linkToPacks && (
              <div className={`${s.pageTitleBlock__menuContainer} ${menuSheet}`}>
                <ul className={s.pageTitleBlock__menu} onClick={handleToogleMenu}>
                  <li
                    className={`${listStyle} ${cardsTotalCount ? '' : s.disabled}`}
                    onClick={handleLearn}
                  ></li>
                  <li className={listStyle} onClick={handleEdit}></li>
                  <li className={listStyle} onClick={handleDelete}></li>
                </ul>
              </div>
            )}

            {button && (
              <CustomButton onClick={handleClickButton}>
                <p>{button}</p>
              </CustomButton>
            )}
          </div>
        </div>

        {isItMyPack && !!showModals && (
          <div className={showModals ? s.modalsContainer : ''}>
            {!!openModals[0] && <EditPack data={sendData} activeModal={handleClose} />}
            {!!openModals[1] && <DeletePack packData={sendData} activeModal={handleClose} />}
          </div>
        )}
      </>
    )
  }
)
