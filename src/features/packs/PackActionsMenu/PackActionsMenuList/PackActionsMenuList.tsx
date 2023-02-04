import { FC, MutableRefObject, useRef } from 'react'

import { useEscapeKey } from '../../../../hooks/useEscapeKey'
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside'
import s from '../PackActionsMenu.module.scss'

type PackActionsMenuListType = {
  parentRef: MutableRefObject<HTMLDivElement>
  handleLearn: () => void
  handleEdit: () => void
  handleDelete: () => void
  closeMenu: () => void
  packIsEmpty: boolean
  openToLeft: boolean
}

export const PackActionsMenuList: FC<PackActionsMenuListType> = ({
  parentRef,
  handleLearn,
  handleEdit,
  handleDelete,
  closeMenu,
  packIsEmpty,
  openToLeft,
}) => {
  const listStyle = `${s.menuItem} ${openToLeft ? s.openItemLeft : s.openItemRight}`
  const listRef = useRef() as MutableRefObject<HTMLUListElement>

  useOnClickOutside(closeMenu, listRef, parentRef)
  useEscapeKey(closeMenu)

  return (
    <ul ref={listRef} className={s.menu} onClick={closeMenu}>
      <li
        className={`${listStyle} ${packIsEmpty ? '' : s.disableLearn}`}
        onMouseDown={handleLearn}
      ></li>
      <li className={listStyle} onMouseDown={handleEdit}></li>
      <li className={listStyle} onMouseDown={handleDelete}></li>
    </ul>
  )
}
