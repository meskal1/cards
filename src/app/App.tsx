import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { CustomSnackbar } from '../common/components/CustomSnackbar/CustomSnackbar'
import { Header } from '../common/components/Header/Header'
import { PATH } from '../constants/routePaths.enum'
import { useAppSelector } from '../hooks/reduxHooks'
import { AppRoutes } from '../routes/routes'

import s from './App.module.scss'

function App() {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN)
    }
  }, [])

  return (
    <>
      <div className={s.app}>
        {isLoggedIn && <Header />}
        <Header />
        <main className={s.mainContent}>
          <AppRoutes />
          <CustomSnackbar />
        </main>
      </div>
    </>
  )
}

export default App
