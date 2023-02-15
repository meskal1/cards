import { useEffect, useState } from 'react'

import { LinearProgress } from '@mui/material'

import { CustomSnackbar } from '../common/components/CustomSnackbar/CustomSnackbar'
import { Header } from '../common/components/Header/Header'
import { IntroAnimation } from '../common/components/IntroAnimation/IntroAnimation'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { useAppSelector } from '../hooks/useAppSelector'
import { AppRoutes } from '../routes/routes'

import s from './App.module.scss'
import { initializeAppTC, RequestStatusType } from './appSlice'

function App() {
  const dispatch = useAppDispatch()
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const [isInitialized, setIsInitialized] = useState(false)
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  const handleAnimationLoaded = () => setIsInitialized(true)

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
        <IntroAnimation isAnimationLoaded={handleAnimationLoaded} />
      )}
    </>
  )
}

export default App
