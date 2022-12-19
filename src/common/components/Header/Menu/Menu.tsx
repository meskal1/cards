import * as React from 'react'

import { useNavigate } from 'react-router-dom'

import logout from '../../../../assets/img/icons/logout.svg'
import user from '../../../../assets/img/icons/user.svg'
import { PATH } from '../../../../constants/routePaths.enum'
import { logOutTC } from '../../../../features/auth/authSlice'
import { useAppDispatch } from '../../../../hooks/reduxHooks'

import s from './Menu.module.scss'

type MenuType = {
  closeMenu: () => void
}

export const Menu: React.FC<MenuType> = ({ closeMenu }) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onClickLogOut = () => {
    closeMenu()
    dispatch(logOutTC())
  }

  const onClickNavigate = () => {
    closeMenu()
    navigate(PATH.PROFILE)
  }

  return (
    <>
      <nav className={s.menu__nav}>
        <ul className={s.menu__itemsList}>
          <li
            className={s.menu__item}
            onClick={onClickNavigate}
            style={{ animationDelay: '0.275s' }}
          >
            <img src={user} alt="user" />
            <p>profile</p>
          </li>
          <li className={s.menu__item} onClick={onClickLogOut} style={{ animationDelay: '0.2s' }}>
            <img src={logout} alt="log out" />
            <p>log out</p>
          </li>
        </ul>
      </nav>
    </>
  )
}
