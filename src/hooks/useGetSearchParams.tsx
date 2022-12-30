import { useLocation } from 'react-router-dom'

export const useGetSearchParams = (always?: string) => {
  const location = always ? useLocation() : null
  const props = always ? location?.search : window.location.toString()
  const paramsArray = props?.split('?')[1]
  let allParams = {} as any
  //  | (PacksQueryParamsType & { cardQuestion?: string })
  //  | URLSearchParamsInit
  //  | ParamKeyValuePair[]

  if (paramsArray) {
    allParams = Object.fromEntries(
      paramsArray.split('&').map(el => [el.split('=')[0], decodeURIComponent(el.split('=')[1])])
    )
  }

  return allParams
}
