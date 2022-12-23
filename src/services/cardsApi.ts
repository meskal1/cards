import axios from 'axios'

// API
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

export const cardsApi = {
  getCards(data: cardsGetDateType) {
    return instance.get<ResponseType>('cards/card', { params: data })
  },

  addCard(data: addCardType) {
    return instance.post<AddCardResponse>('cards/card', { card: data })
  },

  deleteCard(id: string) {
    return instance.delete<DeleteCardResponse>(`cards/card?id=${id}`)
  },

  updateCard(data: updateCardType) {
    return instance.put('cards/card', { card: data })
  },
}

//types

type cardsGetDateType = {
  cardAnswer?: string
  cardQuestion?: string
  cardsPack_id: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
}

type ResponseType = {
  cards: CardType[]
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  packCreated: string
  packName: string
  packPrivate: boolean
  packUpdated: string
  packUserId: string
  page: number
  pageCount: number
  token: string
  tokenDeathTime: number
}

type CardType = {
  answer: string
  cardsPack_id: string
  comments: string
  created: string
  grade: number
  more_id: string
  question: string
  rating: number
  shots: number
  type: string
  updated: string
  user_id: string
  __v: number
  _id: string
}

type addCardType = {
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

type updateCardType = {
  _id: string
  question: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}

type AddCardResponse = {
  newCard: CardType
  token: string
  tokenDeathTime: number
}

type DeleteCardResponse = {
  deletedCard: CardType
  token: string
  tokenDeathTime: number
}
