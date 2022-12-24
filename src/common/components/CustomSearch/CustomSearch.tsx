import * as React from 'react'

import { TextField } from '@mui/material'
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { PATH } from '../../../constants/routePaths.enum'
import { getCardsTC, setSearchCards } from '../../../features/cards/cardsSlice'
import { getPacksTC, setSearchPacks } from '../../../features/packs/packsSlice'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { useDebounce } from '../../../hooks/useDebounce'
import { getSearchParams } from '../../../utils/getSearchParams'

import s from './CustomSearch.module.scss'

type CustomSearchType = {
  cards?: boolean
}

export const CustomSearch: React.FC<CustomSearchType> = ({ cards }) => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = getSearchParams(searchParams)
  const inintInputValue = allParams.search || allParams.cardQuestion || ''
  const [inputValue, setInputValue] = React.useState(inintInputValue)
  const debouncedValue = useDebounce(inputValue)

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  React.useEffect(() => {
    if (debouncedValue) {
      setSearchParams({ search: debouncedValue })
    }

    if (inputValue === '') {
      cards ? searchParams.delete('cardQuestion') : searchParams.delete('search')
      setSearchParams(searchParams)
    }

    if (cards) {
      dispatch(setSearchCards({ cardQuestion: inputValue }))
      dispatch(getCardsTC())
    } else {
      dispatch(setSearchPacks({ search: inputValue }))
      dispatch(getPacksTC())
    }
  }, [debouncedValue])

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
