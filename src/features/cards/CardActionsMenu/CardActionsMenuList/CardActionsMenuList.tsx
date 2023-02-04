import { FC, MutableRefObject, useRef } from 'react'

import { useEscapeKey } from '../../../../hooks/useEscapeKey'
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside'
import s from '../CardActionsMenu.module.scss'

type CardActionsMenuListType = {
  parentRef: MutableRefObject<HTMLDivElement>
  handleEdit: () => void
  handleDelete: () => void
  closeMenu: () => void
}

export const CardActionsMenuList: FC<CardActionsMenuListType> = ({
  parentRef,
  handleEdit,
  handleDelete,
  closeMenu,
}) => {
  const listRef = useRef() as MutableRefObject<HTMLUListElement>

  useOnClickOutside(closeMenu, listRef, parentRef)
  useEscapeKey(closeMenu)

  return (
    <ul ref={listRef} className={s.menu} onClick={closeMenu}>
      <li className={s.menuItem} onMouseDown={handleEdit}></li>
      <li className={s.menuItem} onMouseDown={handleDelete}></li>
    </ul>
  )
}
