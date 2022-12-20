import React from 'react'

import axios from 'axios'

// API
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

export const packsApi = {
  getAllPacks() {
    return instance.get<ResponseType>('cards/pack')
  },

  getMyPacs(id: string) {
    return instance.get<ResponseType>(`cards/pack?user_id=${id}`)
  },

  findPacksByName(name: string) {
    return instance.get<ResponseType>(`cards/pack?packName=${name}`)
  },
}

//types

type ResponseType = {
  cardPacks: Pack[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

type Pack = {
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
