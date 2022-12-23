import * as React from 'react'

import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

import { LoadingProgress } from '../common/components/LoadingProgress/LoadingProgress'
import { PATH } from '../constants/routePaths.enum'
import { Page404 } from '../features/404/Page404'
import { Cards } from '../features/cards/Cards'
import { useAppSelector } from '../hooks/reduxHooks'

const Profile = React.lazy(() =>
  import('../features/profile/Profile').then(module => ({ default: module.Profile }))
)
const Packs = React.lazy(() =>
  import('../features/packs/Packs').then(module => ({ default: module.Packs }))
)
const LogInApp = React.lazy(() =>
  import('../features/auth/LogInApp/LogInApp').then(module => ({ default: module.LogInApp }))
)
const Recovery = React.lazy(() =>
  import('../features/auth/Recovery/Recovery').then(module => ({ default: module.Recovery }))
)
const Registration = React.lazy(() =>
  import('../features/auth/Registration/Registration').then(module => ({
    default: module.Registration,
  }))
)
const CheckEmail = React.lazy(() =>
  import('../features/auth/CheckEmail/CheckEmail').then(module => ({ default: module.CheckEmail }))
)
const NewPassword = React.lazy(() =>
  import('../features/auth/NewPassword/NewPassword').then(module => ({
    default: module.NewPassword,
  }))
)

export const AppRoutes = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const location = useLocation()

  let preventAuthLinks: boolean

  const SuspenseLayout = () => {
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
      <Navigate to={PATH.PACKS} />
    ) : (
      <React.Suspense fallback={<LoadingProgress />}>
        <Outlet />
      </React.Suspense>
    )
  }

  const PrivateRoutes = () => {
    return isLoggedIn ? (
      <React.Suspense fallback={null}>
        <Outlet />
      </React.Suspense>
    ) : (
      <Navigate to={PATH.LOGIN} />
    )
  }

  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={PATH.PROFILE} element={<Profile />} />
          <Route path={PATH.PACKS} element={<Packs />} />
          <Route path={PATH.CARDS} element={<Cards />} />
        </Route>
        <Route element={<SuspenseLayout />}>
          <Route path={PATH.LOGIN} element={<LogInApp />} />
          <Route path={PATH.RECOVERY} element={<Recovery />} />
          <Route path={PATH.REGISTRATION} element={<Registration />} />
          <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
          <Route path={PATH.NEW_PASSWORD_TOKEN} element={<NewPassword />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  )
}
