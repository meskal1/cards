import { FC } from 'react'

import { Dialog } from '../../../../common/components/Popups/Dialog/Dialog'
import { PATH } from '../../../../constants/routePaths.enum'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { useEnterKey } from '../../../../hooks/useEnterKey'
import { queryString } from '../../../../utils/queryString'
import { useLocationNoUpdates, useNavigateNoUpdates } from '../../../../utils/routerUtils'
import { deletePackTC, initialPacksQueryParams } from '../../packsSlice'

export type PackDeleteDataType = {
  id: string
  name: string
}

type DeletePackType = {
  packData: PackDeleteDataType
  isOpened: boolean
  onClose: () => void
}

export const DeletePack: FC<DeletePackType> = ({ isOpened, onClose, packData }) => {
  const dispatch = useAppDispatch()
  const location = useLocationNoUpdates()
  const navigate = useNavigateNoUpdates()
  const packsQueryParams = useAppSelector(state => state.packs.queryParams)
  const packsQueryString = queryString(packsQueryParams, initialPacksQueryParams)
  const isItMyPacks = new RegExp('isMyPacks=yes').test(packsQueryString)
  const queryParams = isItMyPacks ? '?isMyPacks=yes' : '?' + packsQueryString

  const handleDeletePack = async () => {
    await dispatch(deletePackTC(packData.id))

    if (/cards/gi.test(location.pathname)) {
      navigate(PATH.PACKS + queryParams)
    }
    onClose()
  }

  useEnterKey(handleDeletePack)

  return (
    <Dialog
      title={'Delete pack'}
      primaryColor={'red'}
      onOkButtonText={'Delete'}
      onOk={handleDeletePack}
      isOpened={isOpened}
      onClose={onClose}
    >
      <span>
        Are you sure you want to delete Pack: <b>{packData.name}</b>? <br />
        All cards will be deleted.
      </span>
    </Dialog>
  )
}
