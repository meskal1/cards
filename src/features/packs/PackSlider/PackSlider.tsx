import * as React from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useGetSearchParams } from '../../../hooks/useGetSearchParams'
import { updatePacksQueryParamsTC } from '../packsSlice'

import { StyledSlider } from './CustomStyledSlider/CustomStyledSlider'
import s from './PackSlider.module.scss'

export const PackSlider = () => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = useGetSearchParams()
  const minCardsCount = useAppSelector(state => state.packs.cardsCount.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.cardsCount.maxCardsCount)
  const isDataReset = useAppSelector(state => state.packs.isDataReset)
  const [value, setValue] = React.useState<number[]>([
    +allParams.min || minCardsCount,
    +allParams.max || maxCardsCount,
  ])

  const handleChange = (e: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const handleMouseUp = () => {
    if (value[0] !== value[1]) {
      setSearchParams({ ...allParams, min: value[0] + '', max: value[1] + '' })
      dispatch(updatePacksQueryParamsTC({ min: value[0], max: value[1] }))
    }
  }

  React.useEffect(() => {
    setValue([+allParams.min || minCardsCount, +allParams.max || maxCardsCount])
  }, [minCardsCount, maxCardsCount])

  React.useEffect(() => {
    if (!+allParams.min) {
      setValue([minCardsCount, maxCardsCount])
    }
  }, [isDataReset])

  return (
    <>
      <div className={s.sliderContainer}>
        <p className={s.slider__title}>number of cards</p>
        <div className={s.slider__block}>
          <div className={s.slider__number}>{value[0]}</div>
          <StyledSlider
            className={s.slider}
            value={value}
            onChange={handleChange}
            disableSwap
            min={minCardsCount}
            max={maxCardsCount}
            onChangeCommitted={handleMouseUp}
          />
          <div className={s.slider__number}>{value[1]}</div>
        </div>
      </div>
    </>
  )
}
