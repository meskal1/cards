import { CardsSortValuesType } from '../features/cards/cardsSlice'

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
    return instance.delete<DeleteCardResponseType>('cards/card', { params: { id } })
  },

  updateCard(data: UpdateServerCardType) {
    return instance.put<UpdateResponseType>('cards/card', { card: data })
  },

  gradeCard(data: GradeData) {
    return instance.put<GradeCardResponseType>('cards/grade', data)
  },
}

//TYPES
export type GradeData = {
  grade: number
  card_id: string
}

export type QueryCardParamsType = {
  min?: number
  max?: number
  sortCards?: CardsSortValuesType
  page?: number
  pageCount?: number
  cardsPack_id?: string
  cardQuestion?: string
  cardAnswer?: string
}

export type CardsResponseType = {
  cards: ServerCardType[]
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

export type ServerCardType = {
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
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}

type UpdateServerCardType = { _id: string } & Partial<Omit<ServerCardType, '_id'>>

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
  newCard: ServerCardType
  token: string
  tokenDeathTime: number
}

type DeleteCardResponseType = {
  deletedCard: ServerCardType
  token: string
  tokenDeathTime: number
}

type UpdateResponseType = {
  deletedCard: ServerCardType
  token: string
  tokenDeathTime: number
}

type GradeCardResponseType = {
  updatedGrade: upgradedCardType
  token: string
  tokenDeathTime: number
  //   tokenDeathTime: 1672361003260
}

export type upgradedCardType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: 5
  shots: 1
  more_id: string
  created: string
  updated: string
  __v: 0
}
