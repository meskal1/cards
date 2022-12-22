import * as React from 'react'

import { TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { getCardsTC, setSearchCards } from '../../../features/cards/cardsSlice'
import { getPacksTC, setSearchPacks } from '../../../features/packs/packsSlice'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { useDebounce } from '../../../hooks/useDebounce'

import s from './CustomSearch.module.scss'

type CustomSearchType = {
  cards?: boolean
}

export const CustomSearch: React.FC<CustomSearchType> = React.memo(({ cards }) => {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = React.useState('')
  const debouncedValue = useDebounce(inputValue)
  const [searchParams, setSearchParams] = useSearchParams()
  //   const params = new URLSearchParams()

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  React.useEffect(() => {
    const search = () => {
      if (inputValue) {
        setSearchParams({ search: debouncedValue })
      } else {
        searchParams.delete('search')
        setSearchParams(searchParams)
      }
    }

    if (cards) {
      search()
      dispatch(setSearchCards({ cardQuestion: debouncedValue }))
      dispatch(getCardsTC())
    } else {
      search()
      dispatch(setSearchPacks({ search: debouncedValue }))
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
})
