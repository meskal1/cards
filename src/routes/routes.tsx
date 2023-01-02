import { lazy, Suspense } from 'react'

import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'

import { LoadingProgress } from '../common/components/LoadingProgress/LoadingProgress'
import { PATH } from '../constants/routePaths.enum'
import { Page404 } from '../features/404/Page404'
import { useAppSelector } from '../hooks/reduxHooks'

const CheckEmail = lazy(() =>
  import('../features/auth/CheckEmail/CheckEmail').then(module => ({ default: module.CheckEmail }))
)
const LogInApp = lazy(() =>
  import('../features/auth/LogInApp/LogInApp').then(module => ({ default: module.LogInApp }))
)
const NewPassword = lazy(() =>
  import('../features/auth/NewPassword/NewPassword').then(module => ({
    default: module.NewPassword,
  }))
)
const Recovery = lazy(() =>
  import('../features/auth/Recovery/Recovery').then(module => ({ default: module.Recovery }))
)
const Registration = lazy(() =>
  import('../features/auth/Registration/Registration').then(module => ({
    default: module.Registration,
  }))
)
const Cards = lazy(() =>
  import('../features/cards/Cards').then(module => ({
    default: module.Cards,
  }))
)
const Packs = lazy(() =>
  import('../features/packs/Packs').then(module => ({
    default: module.Packs,
  }))
)
const Profile = lazy(() =>
  import('../features/profile/Profile').then(module => ({
    default: module.Profile,
  }))
)

const Learn = lazy(() =>
  import('../features/learn/Learn').then(module => ({
    default: module.Learn,
  }))
)

const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return isLoggedIn ? (
    <Suspense fallback={<LoadingProgress />}>
      <Outlet />
    </Suspense>
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
    <Suspense fallback={<LoadingProgress />}>
      <Outlet />
    </Suspense>
  )
}

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to={PATH.PACKS} replace />} />
          <Route path={PATH.PACKS} element={<Packs />} />
          <Route path={PATH.CARDS} element={<Cards />}>
            <Route path={PATH.CARDS_ID} element={<Cards />} />
          </Route>
          <Route path={PATH.LEARN} element={<Learn />}>
            <Route path={PATH.LEARN_CARD_ID} element={<Learn />} />
            <Route path={PATH.LEARN_PACK_ID} element={<Learn />} />
          </Route>
          <Route path={PATH.PROFILE} element={<Profile />} />
        </Route>

        <Route element={<AuthRoutes />}>
          <Route path={PATH.LOGIN} element={<LogInApp />} />
          <Route path={PATH.RECOVERY} element={<Recovery />} />
          <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
          <Route path={PATH.REGISTRATION} element={<Registration />} />
          <Route path={PATH.NEW_PASSWORD_TOKEN} element={<NewPassword />} />
        </Route>

        <Route path={PATH.PAGE_NOT_FOUND} element={<Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  )
}
