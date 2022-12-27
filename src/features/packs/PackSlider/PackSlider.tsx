import * as React from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { getSearchParams } from '../../../utils/getSearchParams'
import { updateCardsQueryParamsTC } from '../../cards/cardsSlice'
import { updatePacksQueryParamsTC } from '../packsSlice'

import { StyledSlider } from './CustomStyledSlider/CustomStyledSlider'
import s from './PackSlider.module.scss'

export const PackSlider = () => {
  console.log('render slider')
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = getSearchParams(searchParams)
  const min = useAppSelector(state => state.packs.queryParams.min)
  const max = useAppSelector(state => state.packs.queryParams.max)
  const minCardsCount = useAppSelector(state => state.packs.cardsCount.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.cardsCount.maxCardsCount)
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
    if (!allParams.max) {
      // dispatch(updatePacksQueryParamsTC({ min: minCardsCount, max: maxCardsCount }))
    }
  }, [])

  React.useEffect(() => {
    console.log('maxCardsCount: ', maxCardsCount)
    if (!allParams.max) {
      console.log('slider useEffect INside if')
      // dispatch(updatePacksQueryParamsTC({ min: minCardsCount, max: maxCardsCount }))
      // setValue([minCardsCount, maxCardsCount])
    }

    if (min || max || minCardsCount === maxCardsCount) {
      console.log('slider useEffect INside if')
      // setSearchParams({ ...allParams, min: minCardsCount + '', max: maxCardsCount + '' })
      // dispatch(updatePacksQueryParamsTC({ min: minCardsCount, max: maxCardsCount }))
      // setValue([minCardsCount, maxCardsCount])
    }
    if (+allParams.min === min && +allParams.max === max) {
      // setSearchParams({ ...allParams, min: min + '', max: max + '' })
      // dispatch(updatePacksQueryParamsTC({ min: minCardsCount, max: maxCardsCount }))
      // setValue([minCardsCount, maxCardsCount])
      // dispatch(updatePacksQueryParamsTC({ min: minCardsCount, max: maxCardsCount }))
      // setValue([minCardsCount, maxCardsCount])
    }

    if (allParams.isMyPacks && (min !== minCardsCount || max !== maxCardsCount)) {
      // setSearchParams({ ...allParams, min: minCardsCount + '', max: maxCardsCount + '' })
      // dispatch(updatePacksQueryParamsTC({ min: minCardsCount, max: maxCardsCount }))
      // setValue([minCardsCount, maxCardsCount])
    }

    if (+allParams.max === undefined || +allParams.min === undefined) {
      // console.log('slider useEffect INside if')
    }
    //  setSearchParams({ ...allParams, min: minCardsCount + '', max: maxCardsCount + '' })
    //  dispatch(updatePacksQueryParamsTC({ min: minCardsCount, max: maxCardsCount }))
    //  setValue([minCardsCount, maxCardsCount])
    console.log('slider useEffect OUTside if')
  }, [minCardsCount, maxCardsCount])

  return (
    <>
      <div className={s.sliderContainer}>
        <p className={s.slider__title}>number of cards</p>
        <div className={s.slider__block}>
          <div className={s.slider__number}>{value[0]}</div>
          <StyledSlider
            className={s.slider}
            value={[value[0], value[1]]}
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
