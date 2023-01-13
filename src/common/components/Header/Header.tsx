import { useState, MouseEvent } from 'react'

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const handleMouseDownOutOffMenu = (e: MouseEvent) => {
    if ((e.target as Element).id === 'header' && isMenuOpen !== false) {
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <DataSetAndRequestComponent />
      <AppBar
        id="header"
        className={`${s.headerContainer} ${isMenuOpen ? s.beforeElement : ''}`}
        onMouseDown={handleMouseDownOutOffMenu}
      >
        <Container className={s.header}>
          <Toolbar disableGutters>
            <div className={s.header__logoContainer}>
              <Link className={s.header__logo} to={PATH.PROFILE}>
                LOGO
              </Link>
            </div>

            <div className={s.header__avatarContainer}>
              <div className={s.header__userName} onClick={toggleMenu}>
                {name ? name : ''}
              </div>

              {isMenuOpen && <Menu closeMenu={toggleMenu} />}

              <div className={s.header__pic}>
                <img
                  className={s.header__img}
                  src={avatar ? avatar : avatarLocal}
                  alt="avatar"
                  onClick={toggleMenu}
                />
              </div>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
