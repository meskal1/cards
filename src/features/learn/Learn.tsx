import React from 'react'

import { BackToPacks } from '../../common/components/BackToPacks/BackToPacks'

import s from './Learn.module.scss'

export const Learn = () => {
  React.useEffect(() => {}, [])

  return (
    <>
      <div className={s.mainContainer}>
        <BackToPacks />
        <div className={s.learnContainer}>
          <p>Question</p>
        </div>
      </div>
    </>
  )
}
