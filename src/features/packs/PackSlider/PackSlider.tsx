import { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useEffectAfterMount } from '../../../hooks/useEffectAfterMount'
import { setPacksQueryParams } from '../packsSlice'

import { StyledSlider } from './CustomStyledSlider/CustomStyledSlider'
import s from './PackSlider.module.scss'

export const PackSlider = () => {
  const dispatch = useAppDispatch()
  const min = useAppSelector(state => state.packs.queryParams.min)
  const max = useAppSelector(state => state.packs.queryParams.max)
  const minCardsCount = useAppSelector(state => state.packs.packsData.minCardsCount)
  const maxCardsCount = useAppSelector(state => state.packs.packsData.maxCardsCount)
  const [value, setValue] = useState<number[]>([min || minCardsCount, max || maxCardsCount])

  const handleChange = (e: Event, newValue: number | number[]) => setValue(newValue as number[])

  const handleMouseUp = () => {
    if (value[0] !== value[1]) {
      dispatch(setPacksQueryParams({ min: value[0], max: value[1] }))
    }
  }

  useEffectAfterMount(() => {
    setValue([min || minCardsCount, max || maxCardsCount])
  }, [minCardsCount, maxCardsCount, min, max])

  return (
    <div className={s.sliderContainer}>
      <p className={s.slider__title}>Amount of cards</p>
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
  )
}
