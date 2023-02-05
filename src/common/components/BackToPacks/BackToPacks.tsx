import { Link } from 'react-router-dom'

import { PATH } from '../../../constants/routePaths.enum'
import {
  getPacksTC,
  initialPacksQueryParams as initParams,
} from '../../../features/packs/packsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { queryString } from '../../../utils/queryString'
import { useLocationNoUpdates } from '../../../utils/routerUtils'

import s from './BackToPacks.module.scss'

export const BackToPacks = () => {
  const dispatch = useAppDispatch()
  const location = useLocationNoUpdates()
  const cardsPack_id = useAppSelector(state => state.cards.queryParams.cardsPack_id)
  const packsQueryParams = useAppSelector(state => state.packs.queryParams)
  const packsQueryString =
    location.pathname === '/profile' ? '' : '?' + queryString(packsQueryParams, initParams)

  const handleLink = () => {
    if (location.pathname === '/cards/' + cardsPack_id) {
      dispatch(getPacksTC())
    }
  }

  return (
    <Link
      className={s.backToPacks__linkPacks}
      to={PATH.PACKS + packsQueryString}
      onClick={handleLink}
    >
      Packs
    </Link>
  )
}
