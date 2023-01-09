import { useLocation } from 'react-router-dom'

const numberParams = ['max', 'min', 'page', 'pageCount']

export const useGetSearchParams = (always?: string) => {
  const location = always ? useLocation() : null
  const props = always ? location?.search : window.location.toString()
  const params = new URLSearchParams(props?.split('?')[1])
  const allParams = {} as any

  params.forEach((value, key) => {
    allParams[key] = numberParams.includes(key) ? Number(value) : value
  })

  return allParams
}
