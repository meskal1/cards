import { FC } from 'react'

import { RequestStatusType } from '../../../../app/appSlice'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { CustomButton } from '../../CustomButton/CustomButton'

import s from './FooterModal.module.scss'

type FooterModalType = {
  primaryColor?: 'white' | 'red' | 'blue'
  primaryButtonText?: string
  primaryButtonOnClick: () => void
  secondaryButtonText?: string
  secondaryButtonOnClick: () => void
}

export const FooterModal: FC<FooterModalType> = ({
  primaryColor,
  primaryButtonText = 'Submit',
  primaryButtonOnClick,
  secondaryButtonText = 'Cancel',
  secondaryButtonOnClick,
}) => {
  const packsStatus = useAppSelector<RequestStatusType>(state => state.packs.status)
  const cardsStatus = useAppSelector<RequestStatusType>(state => state.cards.status)
  const disableButtons = packsStatus === 'loading' || cardsStatus === 'loading'
  let primaryButtonColor = s.colorWhite

  switch (primaryColor) {
    case 'white':
      primaryButtonColor = s.colorWhite
      break
    case 'red':
      primaryButtonColor = s.colorRed
      break
    case 'blue':
      primaryButtonColor = s.colorBlue
      break
    default:
      primaryButtonColor = s.colorWhite
  }

  return (
    <div className={s.container}>
      <CustomButton
        disabled={disableButtons}
        className={s.secondaryButton}
        onClick={secondaryButtonOnClick}
      >
        {secondaryButtonText}
      </CustomButton>
      <CustomButton
        disabled={disableButtons}
        className={primaryButtonColor}
        onClick={primaryButtonOnClick}
      >
        {primaryButtonText}
      </CustomButton>
    </div>
  )
}
