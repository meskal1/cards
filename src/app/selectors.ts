import { createSelector } from '@reduxjs/toolkit'

import { RootStateType } from './store'

const packsTableData = (state: RootStateType) => state.packs.tableData
const cardsTableData = (state: RootStateType) => state.cards.tableData
const packUserId = (state: RootStateType) => state.cards.cardsData.packUserId
const myId = (state: RootStateType) => state.profile.userData.id

export const packsTableLength = createSelector(packsTableData, tableData => {
  return tableData.length > 0
})

export const cardsTableLength = createSelector(cardsTableData, tableData => {
  return tableData.length > 0
})

export const isMyPack = createSelector([packUserId, myId], (packUserId, myId) => {
  return packUserId === myId
})
