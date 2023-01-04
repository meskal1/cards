import { PacksQueryParamsType } from '../features/packs/packsSlice'

export const extractPacksQueryParams = (
  stateQueryParams: PacksQueryParamsType,
  initialQueryParams: PacksQueryParamsType
) => {
  let queryString = new URLSearchParams()
  const arr1 = Object.entries(stateQueryParams)
  const arr2 = Object.entries(initialQueryParams)

  arr1.forEach((entry, i) => {
    if (arr1[i][1] !== arr2[i][1]) {
      queryString.append(arr1[i][0], arr1[i][1].toString())
    }
  })

  return queryString.toString()
}
