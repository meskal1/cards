import { useState, FC, ChangeEvent } from 'react'

import { TextField } from '@mui/material'

import { setCardsQueryParams } from '../../../features/cards/cardsSlice'
import { setPacksQueryParams } from '../../../features/packs/packsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useDebounce } from '../../../hooks/useDebounce'
import { useEffectAfterMount } from '../../../hooks/useEffectAfterMount'
import { getQueryParams } from '../../../utils/getQueryParams'

import s from './CustomSearch.module.scss'

type CustomSearchType = {
  cards?: boolean
}

export const CustomSearch: FC<CustomSearchType> = ({ cards }) => {
  const dispatch = useAppDispatch()
  const allParams = getQueryParams()
  const search = useAppSelector(state => state.packs.queryParams.search)
  const cardQuestion = useAppSelector(state => state.cards.queryParams.cardQuestion)
  const [inputValue, setInputValue] = useState(allParams.search || allParams.cardQuestion || '')
  const debouncedValue = useDebounce(inputValue)

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value)
  }

  useEffectAfterMount(() => {
    if (cards) {
      if (cardQuestion !== inputValue) {
        dispatch(setCardsQueryParams({ cardQuestion: inputValue }))
      }
    } else if (search !== inputValue) {
      dispatch(setPacksQueryParams({ search: inputValue }))
    }
  }, [debouncedValue])

  useEffectAfterMount(() => {
    setInputValue(allParams.search || allParams.cardQuestion || '')
  }, [allParams.search, allParams.cardQuestion])

  useEffectAfterMount(() => {
    if (!search) {
      setInputValue('')
    }
  }, [search])

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
