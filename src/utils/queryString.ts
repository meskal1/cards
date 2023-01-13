import { CardsQueryParamsType } from '../features/cards/cardsSlice'
import { PacksQueryParamsType } from '../features/packs/packsSlice'

export const queryString = (
  stateQueryParams: PacksQueryParamsType | CardsQueryParamsType,
  initialQueryParams: PacksQueryParamsType | CardsQueryParamsType
) => {
  let queryString = new URLSearchParams()
  let arr1 = Object.entries(stateQueryParams)
  const arr2 = Object.entries(initialQueryParams)

  if (arr1.length > arr2.length) {
    arr1 = arr1.slice(0, arr2.length)
  }

  arr1.forEach((entry, i) => {
    if (arr1[i][1] !== arr2[i][1]) {
      queryString.append(arr1[i][0], arr1[i][1].toString())
    }
  })

  return queryString.toString()
}
