import * as React from 'react'

import { CircularProgress, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { CustomizedSnackbars } from '../common/components/errorSnackBar/ErrorSnackBar'
import { Header } from '../common/components/Header/Header'
import { PATH } from '../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { AppRoutes } from '../routes/routes'

import s from './App.module.scss'
import { initializeAppTC } from './appSlice'

function App() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.isLoggedIn.isLoggedIn)
  const [isAppLoaded, setIsAppLoaded] = React.useState(false)

  const navigateToLogin = () => {
    setIsAppLoaded(true)
    navigate(PATH.LOGIN)
  }

  const stopLoadingPreview = () => {
    setIsAppLoaded(true)
  }

  React.useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeAppTC(navigateToLogin, stopLoadingPreview))
    }
  }, [])

  return (
    <>
      {isAppLoaded ? (
        <>
          <div className={s.app}>
            {isLoggedIn && <Header />}
            <main className={s.mainContent}>
              <AppRoutes />
            </main>
          </div>
          <Box position={'absolute'}>
            <CustomizedSnackbars />
          </Box>
        </>
      ) : (
        <Box className={s.circularProgress}>
          <CircularProgress />
        </Box>
      )}
    </>
  )
}

export default App
