import { FC } from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../../constants/routePaths.enum'
import { logOutTC } from '../../../../features/auth/authSlice'
import { useAppDispatch } from '../../../../hooks/reduxHooks'

import s from './Menu.module.scss'

type MenuType = {
  closeMenu: () => void
}

export const Menu: FC<MenuType> = ({ closeMenu }) => {
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
            <p className={s.menu__itemProfile}>profile</p>
          </li>
          <li className={s.menu__item} onClick={onClickLogOut} style={{ animationDelay: '0.2s' }}>
            <p className={s.menu__itemLogOut}>log out</p>
          </li>
        </ul>
      </nav>
    </>
  )
}
