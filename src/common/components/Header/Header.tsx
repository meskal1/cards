import * as React from 'react'

import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from 'react-router-dom'

import avatarLocal from '../../../assets/img/avatar.jpg'
import { PATH } from '../../../constants/routePaths.enum'
import { logOutTC } from '../../../features/auth/authSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

import s from './Header.module.scss'

const settings = ['Profile', 'Logout']

export const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const name = useAppSelector(state => state.profile.userData.name)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (item: string) => {
    setAnchorElUser(null)

    if (item === 'Profile') {
      navigate(PATH.PROFILE)
    }

    if (item === 'Logout') {
      dispatch(logOutTC())
    }
  }

  const menuItems = settings.map(item => {
    return (
      <MenuItem key={item} onClick={() => handleCloseUserMenu(item)}>
        <Typography textAlign="center">{item}</Typography>
      </MenuItem>
    )
  })

  return (
    <>
      <AppBar className={s.headerContainer}>
        <Container className={s.header}>
          <Toolbar disableGutters>
            <div className={s.header__logoContainer}>
              <Link className={s.header__logo} to={PATH.PROFILE}>
                LOGO
              </Link>
            </div>

            <Box className={s.header__profileBlock}>
              <div className={s.header__userName} onClick={handleOpenUserMenu}>
                {name ? name : ''}
              </div>
              <div>
                <Tooltip title="">
                  <IconButton onClick={handleOpenUserMenu} className={s.header__profileIcon}>
                    <Avatar alt="Remy Sharp" src={avatarLocal} />
                  </IconButton>
                </Tooltip>
                <Menu
                  className={s.header__menu}
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {menuItems}
                </Menu>
              </div>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
