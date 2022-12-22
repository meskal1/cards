import * as React from 'react'

import { useAppDispatch } from '../../../hooks/reduxHooks'

import { StyledSlider } from './CustomStyledSlider/CustomStyledSlider'
import s from './PackSlider.module.scss'

type PackSliderType = {}

export const PackSlider: React.FC<PackSliderType> = React.memo(({}) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = React.useState<number[]>([2, 10])

  const handleChange = (e: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
  }

  const handleMouseUp = () => {
    //  dispatch() show packs with number of cards between min and max value
  }

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
            min={0}
            max={15}
            onChangeCommitted={handleMouseUp} // Callback function that is fired when the mouseup is triggered.
          />
          <div className={s.slider__number}>{value[1]}</div>
        </div>
      </div>
    </>
  )
})
