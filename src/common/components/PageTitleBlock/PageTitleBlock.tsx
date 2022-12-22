import * as React from 'react'

import { BackToPacks } from '../BackToPacks/BackToPacks'
import { CustomButton } from '../CustomButton/CustomButton'

import s from './PageTitleBlock.module.scss'

type PageTitleBlockType = {
  linkToPacks?: boolean
  button: string
  title: string
  buttonClick: () => void
}

export const PageTitleBlock: React.FC<PageTitleBlockType> = React.memo(
  ({ linkToPacks, button, title, buttonClick }) => {
    const handleClick = () => {
      buttonClick()
    }

    return (
      <>
        <div className={s.pageTitleBlockContainer}>
          {linkToPacks && <BackToPacks />}
          <div className={s.pageTitleBlock__titleBlock}>
            <h2 className={s.pageTitleBlock__title}>{title}</h2>
            <CustomButton onClick={handleClick}>
              <p>{button}</p>
            </CustomButton>
          </div>
        </div>
      </>
    )
  }
)
