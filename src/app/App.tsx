import * as React from 'react'

import { CustomSnackbar } from '../common/components/CustomSnackbar/CustomSnackbar'
import { Header } from '../common/components/Header/Header'
import { LoadingProgress } from '../common/components/LoadingProgress/LoadingProgress'
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
          <CustomSnackbar />
        </>
      ) : (
        <LoadingProgress />
      )}
    </>
  )
}

export default App
