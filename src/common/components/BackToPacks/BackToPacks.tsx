import { Link } from 'react-router-dom'

import { PATH } from '../../../constants/routePaths.enum'
import {
  getPacksTC,
  initialPacksQueryParams as initParams,
} from '../../../features/packs/packsSlice'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
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
  const isMyPacks = new RegExp('isMyPacks=yes').test(queryString(packsQueryParams, initParams))

  const handleLink = () => {
    if (location.pathname === '/cards/' + cardsPack_id && isMyPacks) {
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
