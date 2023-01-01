import { FC, memo } from 'react'

import { AddPack } from '../../../features/packs/Modals/AddPack/AddPack'
import { BackToPacks } from '../BackToPacks/BackToPacks'
import { CustomButton } from '../CustomButton/CustomButton'
import { CustomModalDialog } from '../ModalDialog/CustomModalDialog'

import s from './PageTitleBlock.module.scss'

type PageTitleBlockType = {
  linkToPacks?: boolean
  button: string
  title: string
  buttonClick: () => void
}

export const PageTitleBlock: FC<PageTitleBlockType> = memo(
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
            {button && (
              <CustomButton onClick={handleClick}>
                <p>{button}</p>
              </CustomButton>
            )}
          </div>
        </div>
      </>
    )
  }
)
