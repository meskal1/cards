import { useEffect } from 'react'

import { LinearProgress } from '@mui/material'

import { CustomSnackbar } from '../common/components/CustomSnackbar/CustomSnackbar'
import { Header } from '../common/components/Header/Header'
import { LoadingProgress } from '../common/components/LoadingProgress/LoadingProgress'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { AppRoutes } from '../routes/routes'

import s from './App.module.scss'
import { initializeAppTC, RequestStatusType } from './appSlice'

function App() {
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return (
    <>
      {isInitialized ? (
        <>
          <div className={s.app}>
            {isLoggedIn && <Header />}
            {status === 'loading' ? <LinearProgress /> : <div className={s.fakeProgress}></div>}
            <main className={s.mainContent}>
              <AppRoutes />
            </main>
          </div>
          <CustomSnackbar />
        </>
      ) : (
        <LoadingProgress />
      )}
    </>
  )
}

export default App
