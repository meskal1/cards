import { createSelector } from '@reduxjs/toolkit'

import { RootStateType } from './store'

const packUserId = (state: RootStateType) => state.cards.cardsData.packUserId
const myId = (state: RootStateType) => state.profile.userData.id

export const isMyPack = createSelector([packUserId, myId], (packUserId, myId) => {
  return packUserId === myId
})
