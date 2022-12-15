import * as React from 'react'

import { useNavigate } from 'react-router'

import emailIcon from '../../../assets/img/icons/check_email.svg'
import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppSelector } from '../../../hooks/reduxHooks'

import s from './CheckEmail.module.scss'

type CheckEmailType = {}

export const CheckEmail: React.FC<CheckEmailType> = ({}) => {
  const navigate = useNavigate()
  //   const recoveryEmail = useAppSelector(state => state.auth.recoveryEmail)

  const onClickNavigate = () => {
    navigate(PATH.LOGIN)
  }

  return (
    <>
      <div className={s.checkEmailContainer}>
        <h2 className={s.checkEmail__title}>check email</h2>
        <img className={s.checkEmail__img} src={emailIcon} alt="emailIcon" />
        <p className={s.checkEmail__text}>
          {`we've sent an Email with instructions to ${'recoveryEmail'}`}
        </p>
        <CustomButton onClick={onClickNavigate}>Back to login</CustomButton>
      </div>
    </>
  )
}
