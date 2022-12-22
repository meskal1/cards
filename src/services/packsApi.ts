import React from 'react'

import axios from 'axios'

// API
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

export type DataType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
}

export const packsApi = {
  getPacks(data: DataType) {
    return instance.get<ResponseType>('cards/pack', { params: data })
  },

  addPack(data: PacksDataType) {
    return instance.post<addPackResponse>('cards/pack', { cardsPack: data })
  },

  deletePack(id: string) {
    return instance.delete<deleteResponse>(`cards/pack?id=${id}`)
  },

  updatePack(data: UpdatePackType) {
    return instance.put<UpdateResponse>('cards/pack', { cardsPack: data })
  },
}

//types

export type ResponseType = {
  cardPacks: Pack[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type Pack = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
  deckCover: string | null
}

type addPackResponse = {
  newCardsPack: Pack
  token: string
  tokenDeathTime: number
}

type deleteResponse = {
  deletedCardsPack: Pack
  token: string
  tokenDeathTime: number
}

type UpdateResponse = {
  updatedCardsPack: Pack
  token: string
  tokenDeathTime: number
}

export type PacksDataType = {
  name: string
  deckCover?: string
  private: boolean
}

export type UpdatePackType = {
  _id: string
  name?: string
  deckCover?: string
  private?: boolean
}
