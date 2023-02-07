import { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { PATH } from '../constants/routePaths.enum'
import {
  getCardsTC,
  initialCardsQueryParams,
  setCardsQueryParams,
} from '../features/cards/cardsSlice'
import {
  clearPacksQueryParams,
  getPacksTC,
  initialPacksQueryParams,
  setPacksQueryParams,
} from '../features/packs/packsSlice'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { useEffectAfterMount } from '../hooks/useEffectAfterMount'

import { getQueryParams } from './getQueryParams'
import { queryString } from './queryString'
import { useNavigateNoUpdates } from './routerUtils'

export const DataSetAndRequestComponent = () => {
  const packsQueryParams = useAppSelector(state => state.packs.queryParams)
  const cardsQueryParams = useAppSelector(state => state.cards.queryParams)
  const packsQueryString = queryString(packsQueryParams, initialPacksQueryParams)
  const cardsQueryString = queryString(cardsQueryParams, initialCardsQueryParams)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const isCards = new RegExp('/cards').test(location.pathname)
  const isLearn = new RegExp('/learn').test(location.pathname)
  const navigate = useNavigateNoUpdates()
  const allParams = getQueryParams()
  const cardsPack_id = useAppSelector(state => state.cards.queryParams.cardsPack_id)
  const locationSearch = location.search.split('?')[1]
  const search = locationSearch ? locationSearch : ''
  const locationPath = location.pathname

  useEffectAfterMount(() => {
    if (isCards) {
      if (search !== cardsQueryString && search !== '') {
        dispatch(setCardsQueryParams({ ...initialCardsQueryParams, ...allParams }))
      }

      if (search === '' && cardsQueryString.length !== 0) {
        dispatch(setCardsQueryParams(initialCardsQueryParams))
      }
    } else {
      if (search !== packsQueryString && search !== '') {
        dispatch(setPacksQueryParams({ ...initialPacksQueryParams, ...allParams }))
      }

      if (search === '' && packsQueryString.length !== 0) {
        dispatch(clearPacksQueryParams())
      }
    }
  }, [search])

  useEffectAfterMount(() => {
    if (isCards && cardsPack_id && locationPath !== `/cards/${cardsPack_id}`) {
      window.history.replaceState({}, '', `/#/cards/${cardsPack_id + '?' + cardsQueryString}`)
      dispatch(setCardsQueryParams({ cardsPack_id: locationPath.split('/cards/')[1] }))
    }
  }, [locationPath])

  useEffectAfterMount(() => {
    if (search !== packsQueryString) {
      navigate(PATH.PACKS + '?' + packsQueryString)
    }

    if (!isLearn) {
      dispatch(getPacksTC())
    }
  }, [packsQueryParams])

  useEffectAfterMount(() => {
    if (search !== cardsQueryString) {
      if (Object.keys(cardsQueryString).length !== 0) {
        navigate(PATH.CARDS + `/${cardsPack_id}` + '?' + cardsQueryString)
      }

      if (isCards && Object.keys(cardsQueryString).length === 0 && search !== '') {
        navigate(PATH.CARDS + `/${cardsPack_id}`)
      }
    }

    if (cardsPack_id) {
      dispatch(getCardsTC())
    }
  }, [cardsQueryParams])

  useEffect(() => {
    if (!isCards && search !== '') {
      dispatch(setPacksQueryParams(allParams))
    }
  }, [])

  return <></>
}
