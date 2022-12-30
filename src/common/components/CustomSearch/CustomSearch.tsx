import * as React from 'react'

import { TextField } from '@mui/material'
import { useLocation, useSearchParams } from 'react-router-dom'

import { updateCardsQueryParamsTC } from '../../../features/cards/cardsSlice'
import { updatePacksQueryParamsTC } from '../../../features/packs/packsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useDebounce } from '../../../hooks/useDebounce'
import { useGetSearchParams } from '../../../hooks/useGetSearchParams'

import s from './CustomSearch.module.scss'

type CustomSearchType = {
  cards?: boolean
}

export const CustomSearch: React.FC<CustomSearchType> = ({ cards }) => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = useGetSearchParams('always')
  const inintInputValue = allParams.search || allParams.cardQuestion || ''
  const [inputValue, setInputValue] = React.useState(inintInputValue)
  const debouncedValue = useDebounce(inputValue)
  const search = useAppSelector(state => state.packs.queryParams.search)
  const cardQuestion = useAppSelector(state => state.cards.queryParams.cardQuestion)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  React.useEffect(() => {
    const isItWorthUpdating = () => {
      if (cards) {
        if (cardQuestion !== inputValue) {
          dispatch(updateCardsQueryParamsTC({ cardQuestion: inputValue }))
        }
      } else {
        if (search !== inputValue) {
          dispatch(updatePacksQueryParamsTC({ search: inputValue }))
        }
      }
    }

    if (inputValue !== search && inputValue !== '') {
      setSearchParams({ ...allParams, [`${cards ? 'cardQuestion' : 'search'}`]: inputValue })
      isItWorthUpdating()
    }

    if (debouncedValue === '' && inintInputValue) {
      cards ? searchParams.delete('cardQuestion') : searchParams.delete('search')
      setSearchParams(searchParams)
      isItWorthUpdating()
    }
  }, [debouncedValue])

  React.useEffect(() => {
    setInputValue(inintInputValue)
  }, [location.search])

  return (
    <>
      <div className={s.searchContainer}>
        <p className={s.search__title}>search</p>
        <TextField
          className={s.search__input}
          value={inputValue}
          variant={'outlined'}
          type={'search'}
          autoComplete="off"
          onChange={handleChangeInput}
        />
      </div>
    </>
  )
}
