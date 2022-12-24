import * as React from 'react'

import { Navigate, Outlet, Route, Routes, useLocation, useSearchParams } from 'react-router-dom'

import { LoadingProgress } from '../common/components/LoadingProgress/LoadingProgress'
import { PATH } from '../constants/routePaths.enum'
import { Page404 } from '../features/404/Page404'
import { useAppSelector } from '../hooks/reduxHooks'

const CheckEmail = React.lazy(() =>
  import('../features/auth/CheckEmail/CheckEmail').then(module => ({ default: module.CheckEmail }))
)
const LogInApp = React.lazy(() =>
  import('../features/auth/LogInApp/LogInApp').then(module => ({ default: module.LogInApp }))
)
const NewPassword = React.lazy(() =>
  import('../features/auth/NewPassword/NewPassword').then(module => ({
    default: module.NewPassword,
  }))
)
const Recovery = React.lazy(() =>
  import('../features/auth/Recovery/Recovery').then(module => ({ default: module.Recovery }))
)
const Registration = React.lazy(() =>
  import('../features/auth/Registration/Registration').then(module => ({
    default: module.Registration,
  }))
)
const Cards = React.lazy(() =>
  import('../features/cards/Cards').then(module => ({
    default: module.Cards,
  }))
)
const Packs = React.lazy(() =>
  import('../features/packs/Packs').then(module => ({
    default: module.Packs,
  }))
)
const Profile = React.lazy(() =>
  import('../features/profile/Profile').then(module => ({
    default: module.Profile,
  }))
)

const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return isLoggedIn ? (
    <React.Suspense fallback={null}>
      <Outlet />
    </React.Suspense>
  ) : (
    <Navigate to={PATH.LOGIN} replace />
  )
}

const AuthRoutes = () => {
  const location = useLocation()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  let preventAuthLinks = false

  if (isLoggedIn) {
    switch (location.pathname) {
      case PATH.LOGIN:
      case PATH.CHECK_EMAIL:
      case PATH.NEW_PASSWORD_TOKEN:
      case PATH.RECOVERY:
      case PATH.REGISTRATION:
        preventAuthLinks = true
    }
  }

  return preventAuthLinks ? (
    <Navigate to={PATH.PACKS} replace />
  ) : (
    <React.Suspense fallback={<LoadingProgress />}>
      <Outlet />
    </React.Suspense>
  )
}

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to={PATH.PACKS} replace />} />
          <Route path={PATH.PACKS} element={<Packs />} />
          <Route path={PATH.CARDS} element={<Cards />} />
          <Route path={PATH.PROFILE} element={<Profile />} />
        </Route>
        <Route element={<AuthRoutes />}>
          <Route path={PATH.LOGIN} element={<LogInApp />} />
          <Route path={PATH.RECOVERY} element={<Recovery />} />
          <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
          <Route path={PATH.REGISTRATION} element={<Registration />} />
          <Route path={PATH.NEW_PASSWORD_TOKEN} element={<NewPassword />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  )
}
