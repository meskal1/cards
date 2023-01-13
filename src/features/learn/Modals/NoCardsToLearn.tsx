import Button from '@mui/material/Button'

import { PATH } from '../../../constants/routePaths.enum'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { queryString } from '../../../utils/queryString'
import { useNavigateNoUpdates } from '../../../utils/routerUtils'
import { initialPacksQueryParams as initParams } from '../../packs/packsSlice'

import s from './NoCardsToLearn.module.scss'

export const NoCardsToLearn = () => {
  const navigate = useNavigateNoUpdates()
  const packsQueryParams = useAppSelector(state => state.packs.queryParams)
  const packsQueryString = '?' + queryString(packsQueryParams, initParams)

  const handleChooseNewPack = () => navigate(PATH.PACKS + packsQueryString)

  return (
    <div className={s.MainContainer}>
      <p className={s.Message}>
        No cards left in current Pack, you can choose another Pack from the list to learn
      </p>
      <div className={s.ButtonContainer}>
        <Button variant={'contained'} onClick={handleChooseNewPack}>
          Choose next Pack
        </Button>
      </div>
    </div>
  )
}
