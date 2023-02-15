import { FC, MutableRefObject, useRef } from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../../constants/routePaths.enum'
import { logOutTC } from '../../../../features/auth/authSlice'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { useEscapeKey } from '../../../../hooks/useEscapeKey'
import { useOnClickOutside } from '../../../../hooks/useOnClickOutside'

import s from './Menu.module.scss'

type MenuType = {
  parentRef: MutableRefObject<HTMLDivElement>
  closeMenu: () => void
}

export const Menu: FC<MenuType> = ({ parentRef, closeMenu }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const navRef = useRef() as MutableRefObject<HTMLDivElement>

  const onClickLogOut = () => {
    closeMenu()
    dispatch(logOutTC())
  }

  const onClickNavigate = () => {
    closeMenu()
    navigate(PATH.PROFILE)
  }

  useOnClickOutside(closeMenu, navRef, parentRef)
  useEscapeKey(closeMenu)

  return (
    <nav ref={navRef} className={s.menu__nav}>
      <ul className={s.menu__itemsList}>
        <li
          className={s.menu__item}
          onMouseDown={onClickNavigate}
          style={{ animationDelay: '0.25s' }}
        >
          <p className={s.menu__itemProfile}>Profile</p>
        </li>
        <li
          className={s.menu__item}
          onMouseDown={onClickLogOut}
          style={{ animationDelay: '0.15s' }}
        >
          <p className={s.menu__itemLogOut}>Log out</p>
        </li>
      </ul>
    </nav>
  )
}
