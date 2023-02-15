import { Dialog } from '../../../common/components/Popups/Dialog/Dialog'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { queryString } from '../../../utils/queryString'
import { useNavigateNoUpdates } from '../../../utils/routerUtils'
import { initialPacksQueryParams as initParams } from '../../packs/packsSlice'

export const NoCardsToLearn = () => {
  const navigate = useNavigateNoUpdates()
  const packsQueryParams = useAppSelector(state => state.packs.queryParams)
  const packsQueryString = '?' + queryString(packsQueryParams, initParams)

  const handleNewPack = () => navigate(PATH.PACKS + packsQueryString)

  return (
    <Dialog
      title={'No cards left'}
      primaryColor={'white'}
      onOkButtonText={'Choose next Pack'}
      onOk={handleNewPack}
      isOpened={true}
      onClose={handleNewPack}
    >
      No cards left in current Pack, you can choose another Pack from the list to learn
    </Dialog>
  )
}
