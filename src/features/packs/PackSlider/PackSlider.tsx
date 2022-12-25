import * as React from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { getSearchParams } from '../../../utils/getSearchParams'
import { updatePacksQueryParamsTC } from '../packsSlice'

import { StyledSlider } from './CustomStyledSlider/CustomStyledSlider'
import s from './PackSlider.module.scss'

type PackSliderType = {}

export const PackSlider: React.FC<PackSliderType> = React.memo(({}) => {
  console.log('render slider')
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = getSearchParams(searchParams)
  const min = useAppSelector(state => state.packs.queryParams.min)
  const max = useAppSelector(state => state.packs.queryParams.max)
  const [value, setValue] = React.useState<number[]>([min, max])

  const handleChange = (e: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const handleMouseUp = () => {
    //  dispatch() show packs with number of cards between min and max value
    setSearchParams({ ...allParams, min: value[0], max: value[1] })
    //  dispatch(updatePacksQueryParamsTC({ max: value[1], min: value[0] }))
  }

  React.useEffect(() => {
    setValue([min, max])
  }, [min, max])

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
            min={min}
            max={max}
            onChangeCommitted={handleMouseUp} // Callback function that is fired when the mouseup is triggered.
          />
          <div className={s.slider__number}>{value[1]}</div>
        </div>
      </div>
    </>
  )
})
