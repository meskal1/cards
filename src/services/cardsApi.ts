import { SortValuesCardsType } from '../features/cards/cardsSlice'

import { instance } from './instance'

// API
export const cardsAPI = {
  getCards(data: QueryCardParamsType) {
    return instance.get<CardsResponseType>('cards/card', { params: data })
  },

  addCard(data: CreateCardType) {
    return instance.post<AddCardResponseType>('cards/card', { card: data })
  },

  deleteCard(id: string) {
    return instance.delete<DeleteCardResponseType>('cards/card', { params: id })
  },

  updateCard(data: CardType) {
    return instance.put<UpdateResponseType>('cards/card', { card: data })
  },
}

//TYPES
export type QueryCardParamsType = {
  min?: number
  max?: number
  sortCards?: SortValuesCardsType
  page?: number
  pageCount?: number
  cardsPack_id?: string
  cardQuestion?: string
  cardAnswer?: string
}

export type CardsResponseType = {
  cards: CardType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: string
  packUpdated: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}

export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: string
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
}

export type CreateCardType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

type AddCardResponseType = {
  newCard: CardType
  token: string
  tokenDeathTime: number
}

type DeleteCardResponseType = {
  deletedCard: CardType
  token: string
  tokenDeathTime: number
}

type UpdateResponseType = {
  deletedCard: CardType
  token: string
  tokenDeathTime: number
}
