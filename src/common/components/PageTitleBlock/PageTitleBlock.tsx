import { FC, memo, useState } from 'react'

import { Portal } from '@mui/base'

import { EditPack } from '../../../features/packs/Modals/EditPack/EditPack'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { BackToPacks } from '../BackToPacks/BackToPacks'
import { CustomButton } from '../CustomButton/CustomButton'

import s from './PageTitleBlock.module.scss'

type PageTitleBlockType = {
  linkToPacks?: boolean
  button: string
  title: string
  buttonClick: () => void
}

export const PageTitleBlock: FC<PageTitleBlockType> = memo(
  ({ linkToPacks, button, title, buttonClick }) => {
    const packUserId = useAppSelector(state => state.cards.cardsData.packUserId)
    const packId = useAppSelector(state => state.cards.tableData[0]?.cardsPack_id)
    const myId = useAppSelector(state => state.profile.userData.id)
    const isItMyPack = packUserId === myId
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuSheet = isMenuOpen ? s.pageTitleBlock__menuSheet : ''
    const menuItemStyle = isMenuOpen ? s.pageTitleBlock__menuItemStyle : ''
    const [openModals, setOpenModals] = useState<number[]>([0, 0, 0])
    const showModals = openModals.reduce((a, b) => a + b, 0)
    const dataEdit = { id: packId, name: title }
    const portalStyle = isMenuOpen ? s.portal : ''
    const portalStyleBg = showModals ? s.portalBgColor : ''

    const handleClickButton = () => {
      buttonClick()
    }

    const handleToogleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
    }

    const handleCloseMenu = () => {
      setIsMenuOpen(false)
      setOpenModals([0, 0, 0])
    }

    const handleLearn = () => {
      setOpenModals([1, 0, 0])
    }

    const handleEdit = () => {
      setOpenModals([0, 1, 0])
    }

    const handleDelete = () => {
      setOpenModals([0, 0, 1])
    }

    return (
      <>
        <Portal>
          <div className={portalStyle || portalStyleBg} onClick={handleCloseMenu}></div>
        </Portal>

        <div className={s.pageTitleBlockContainer}>
          {linkToPacks && <BackToPacks />}
          <div className={s.pageTitleBlock__titleBlock}>
            <h2 className={s.pageTitleBlock__title}>{title}</h2>
            {isItMyPack && (
              <div className={`${s.pageTitleBlock__menuContainer} ${menuSheet}`}>
                <ul className={s.pageTitleBlock__menu} onClick={handleToogleMenu}>
                  <li className={`${s.menuItem} ${menuItemStyle}`} onClick={handleLearn}></li>
                  <li className={`${s.menuItem} ${menuItemStyle}`} onClick={handleEdit}></li>
                  <li className={`${s.menuItem} ${menuItemStyle}`} onClick={handleDelete}></li>
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
            {!!openModals[1] && <EditPack data={dataEdit} closeModal={handleCloseMenu} />}
          </div>
        )}
      </>
    )
  }
)
