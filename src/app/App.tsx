import * as React from 'react'

import { CircularProgress, Box } from '@mui/material'

import { CustomSnackbar } from '../common/components/CustomSnackbar/CustomSnackbar'
import { Header } from '../common/components/Header/Header'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { AppRoutes } from '../routes/routes'

import s from './App.module.scss'
import { initializeAppTC } from './appSlice'

function App() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return (
    <>
      {isInitialized ? (
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
