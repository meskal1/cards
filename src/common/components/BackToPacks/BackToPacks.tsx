import { KeyboardBackspace } from '@mui/icons-material'
import { Link } from 'react-router-dom'

import { PATH } from '../../../constants/routePaths.enum'
import { initialPacksQueryParams as initParams } from '../../../features/packs/packsSlice'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { queryString } from '../../../utils/queryString'
import { useLocationNoUpdates } from '../../../utils/routerUtils'

import s from './BackToPacks.module.scss'

export const BackToPacks = () => {
  const location = useLocationNoUpdates()
  const packsQueryParams = useAppSelector(state => state.packs.queryParams)
  const packsQueryString =
    location.pathname === '/profile' ? '' : '?' + queryString(packsQueryParams, initParams)

  return (
    <>
      <Link className={s.backToPacks__linkPacks} to={PATH.PACKS + packsQueryString}>
        <KeyboardBackspace className={s.backToPacks__arrow} />
        <p>back to packs list</p>
      </Link>
    </>
  )
}
