import { Route, Routes } from 'react-router-dom'

import { PATH } from '../constants/routePaths.enum'
import { Page404 } from '../features/404/Page404'
import { CheckEmail } from '../features/auth/CheckEmail/CheckEmail'
import { LogInApp } from '../features/auth/LogInApp/LogInApp'
import { NewPassword } from '../features/auth/NewPassword/NewPassword'
import { Recovery } from '../features/auth/Recovery/Recovery'
import { Registration } from '../features/auth/Registration/Registration'
import { Packs } from '../features/packs/Packs'
import { Profile } from '../features/profile/Profile'

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={PATH.PACKS} element={<Packs />} />
        <Route path={PATH.LOGIN} element={<LogInApp />} />
        <Route path={PATH.RECOVERY} element={<Recovery />} />
        <Route path={PATH.REGISTRATION} element={<Registration />} />
        <Route path={PATH.CHECK_EMAIL} element={<CheckEmail />} />
        <Route path={PATH.NEW_PASSWORD} element={<NewPassword />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  )
}
