import { KeyboardBackspace } from '@mui/icons-material'
import { Link, useLocation } from 'react-router-dom'

import { PATH } from '../../../constants/routePaths.enum'
import { initialPacksQueryParams } from '../../../features/packs/packsSlice'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { packsQueryString } from '../../../utils/packsQueryString'

import s from './BackToPacks.module.scss'

export const BackToPacks = () => {
  const location = useLocation()
  const packsQueryParams = useAppSelector(state => state.packs.queryParams)
  const queryString =
    location.pathname === '/profile'
      ? ''
      : '?' + packsQueryString(packsQueryParams, initialPacksQueryParams)

  return (
    <>
      <Link className={s.backToPacks__linkPacks} to={PATH.PACKS + queryString}>
        <KeyboardBackspace className={s.backToPacks__arrow} />
        <p>back to packs list</p>
      </Link>
    </>
  )
}
