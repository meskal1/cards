import { FC, AnimationEvent, useState, useEffect } from 'react'

import exclamationPoint from '../../../assets/img/icons/exclamationPoint.svg'
import questionMark from '../../../assets/img/icons/questionMark.svg'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useImagePreloader } from '../../../hooks/useImagePreloader'

import s from './IntroAnimation.module.scss'

const preloadSrcList: string[] = [exclamationPoint, questionMark]

type IntroAnimationType = {
  isAnimationLoaded: () => void
}

export const IntroAnimation: FC<IntroAnimationType> = ({ isAnimationLoaded }) => {
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const [animationLoaded, setAnimationLoaded] = useState(false)
  const [isImgLoaded, setIsImgLoaded] = useState(false)
  const { imagesPreloaded } = useImagePreloader(preloadSrcList)

  const handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (/widthAnimation/.test(e.animationName)) {
      setAnimationLoaded(true)
    }
  }

  useEffect(() => {
    if (imagesPreloaded) {
      setIsImgLoaded(true)
    }

    if (animationLoaded) {
      setTimeout(() => isAnimationLoaded(), 400)
    }
  }, [isInitialized, animationLoaded, imagesPreloaded])

  return (
    <>
      {isImgLoaded && (
        <div className={s.container}>
          <div className={s.content} onAnimationEnd={handleAnimationEnd}>
            <div className={s.logoContainer}>
              <img className={s.questionMark} src={questionMark} alt="" />
              <img className={s.exclamationPoint} src={exclamationPoint} alt="" />
            </div>
            <div className={s.logoText}>Cards</div>
          </div>
        </div>
      )}
    </>
  )
}
