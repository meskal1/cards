import React, { useEffect } from 'react'

import { AppRoutes } from '../routes/routes'
import { Header } from '../common/components/Header/Header'
import { PATH } from '../constants/routePaths.enum'
import s from './App.module.scss'
import { useAppSelector } from '../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'

function App() {
  const isLoggedIn = useAppSelector(state => state.isLoggedIn.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(PATH.LOGIN)
    }
  }, [])

  return (
    <>
      <div className={s.app}>
        <Header />
        <main className={s.mainContent}>
          <AppRoutes />
        </main>
      </div>
    </>
  )
}

export default App
