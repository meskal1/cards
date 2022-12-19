import * as React from 'react'

import { Toolbar } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'

import avatarLocal from '../../../assets/img/avatar.jpg'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { Menu } from '../Header/Menu/Menu'

import s from './Header.module.scss'

export const Header = () => {
  const name = useAppSelector(state => state.profile.userData.name)
  const avatar = useAppSelector(state => state.profile.userData.avatar)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const onClickHandleMenu = () => {
    isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
  }

  const onMouseDownOutOffMenu = (e: React.MouseEvent) => {
    if ((e.target as Element).id === 'header' && isMenuOpen !== false) {
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <AppBar
        id="header"
        className={`${s.headerContainer} ${isMenuOpen ? s.beforeElement : ''}`}
        onMouseDown={onMouseDownOutOffMenu}
      >
        <Container className={s.header}>
          <Toolbar disableGutters>
            <div className={s.header__logoContainer}>
              <Link className={s.header__logo} to={PATH.PROFILE}>
                LOGO
              </Link>
            </div>

            <div className={s.header__avatarContainer}>
              <div className={s.header__userName} onClick={onClickHandleMenu}>
                {name ? name : ''}
              </div>

              {isMenuOpen && <Menu closeMenu={onClickHandleMenu} />}

              <div className={s.header__pic}>
                <img
                  className={s.header__img}
                  src={avatarLocal || avatar}
                  alt="avatar"
                  onClick={onClickHandleMenu}
                />
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
