import * as React from 'react'

import { TextField } from '@mui/material'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'

import { getCardsTC, setSearchCards } from '../../../features/cards/cardsSlice'
import { getPacksTC, setSearchPacks } from '../../../features/packs/packsSlice'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { useDebounce } from '../../../hooks/useDebounce'
import { getSearchParams } from '../../../utils/getAllSearchParams'

import s from './CustomSearch.module.scss'

type CustomSearchType = {
  cards?: boolean
  customSearchParams: (param: string, value: string) => void
}

export const CustomSearch: React.FC<CustomSearchType> = React.memo(
  ({ cards, customSearchParams }) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const [inputValue, setInputValue] = React.useState(
      searchParams.get('search') || searchParams.get('cardQuestion') || ''
    )
    const debouncedValue = useDebounce(inputValue)
    const allParams = getSearchParams(searchParams)

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.currentTarget.value)
    }

    React.useEffect(() => {
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
            type={'text'}
            autoComplete="off"
            onChange={handleChangeInput}
          />
        </div>
      </>
    )
  }
)
