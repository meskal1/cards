import { instance } from './instance'

// API
export const packsAPI = {
  getPacks(data: QueryPackParamsType) {
    return instance.get<PacksResponseType>('cards/pack', { params: data })
  },

  addPack(data: CreatePackType) {
    return instance.post<AddPackResponseType>('cards/pack', { cardsPack: data })
  },

  deletePack(id: string) {
    return instance.delete<DeletePackResponseType>('cards/pack', { params: { id } })
  },

  updatePack(data: UpdatePackType) {
    return instance.put<UpdatePackResponseType>('cards/pack', { cardsPack: data })
  },
}

//TYPES
export type QueryPackParamsType = {
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  user_id?: string
  block?: string
}

export type PacksResponseType = {
  cardPacks: ServerPackType[]
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}

export type ServerPackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string | null
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

type UpdatePackType = Pick<ServerPackType, '_id' & 'name'>

type AddPackResponseType = {
  newCardsPack: ServerPackType
  token: string
  tokenDeathTime: number
}

type DeletePackResponseType = {
  deletedCardsPack: ServerPackType
  token: string
  tokenDeathTime: number
}

type UpdatePackResponseType = {
  updatedCardsPack: ServerPackType
  token: string
  tokenDeathTime: number
}

export type CreatePackType = {
  name: string
  deckCover?: string
  private: boolean
}
