import { useState, useRef, MutableRefObject } from 'react'

import { Toolbar } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { Container } from '@mui/system'
import { Link } from 'react-router-dom'

import avatarLocal from '../../../assets/img/avatar.jpg'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { DataSetAndRequestComponent } from '../../../utils/DataSetAndRequestComponent'
import { Menu } from '../Header/Menu/Menu'

import s from './Header.module.scss'

export const Header = () => {
  const name = useAppSelector(state => state.profile.userData.name)
  const avatar = useAppSelector(state => state.profile.userData.avatar)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <DataSetAndRequestComponent />
      <AppBar id="header" className={s.headerContainer}>
        <Container className={s.header}>
          <Toolbar disableGutters>
            <div className={s.header__logoContainer}>
              <Link className={s.header__logo} to={PATH.PROFILE}>
                Cards
              </Link>
            </div>

            <div ref={menuRef} className={s.header__avatarContainer}>
              <div className={s.header__userName} onClick={handleToggleMenu}>
                {name || ''}
              </div>

              {isMenuOpen && <Menu parentRef={menuRef} closeMenu={handleToggleMenu} />}

              <div className={s.header__pic}>
                <img
                  className={s.header__img}
                  src={avatar || avatarLocal}
                  alt="avatar"
                  onClick={handleToggleMenu}
                />
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
