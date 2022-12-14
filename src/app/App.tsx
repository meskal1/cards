import * as React from 'react'

import { CircularProgress, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { CustomSnackbar } from '../common/components/CustomSnackbar/CustomSnackbar'
import { Header } from '../common/components/Header/Header'
import { PATH } from '../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { AppRoutes } from '../routes/routes'

import s from './App.module.scss'
import { initializeAppTC } from './appSlice'

function App() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isAppLoaded, setIsAppLoaded] = React.useState(false)

  const navigateToLogin = () => {
    setIsAppLoaded(true)
    navigate(PATH.LOGIN)
  }

  const stopLoadingPreview = () => {
    setIsAppLoaded(true)
  }

  console.log(process.env.REACT_APP_BASE_URL)

  React.useEffect(() => {
    dispatch(initializeAppTC(navigateToLogin, stopLoadingPreview))
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
            <CustomSnackbar />
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
