import { useEffect } from 'react'

import { useNavigate } from 'react-router'

import emailIcon from '../../../assets/img/icons/checkEmail.svg'
import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { setRecoveryEmail } from '../authSlice'

import s from './CheckEmail.module.scss'

export const CheckEmail = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const recoveryEmail = useAppSelector(state => state.auth.recoveryEmail)

  const onClickNavigate = () => {
    navigate(PATH.LOGIN)
  }

  useEffect(() => {
    const setEmail = () => {
      dispatch(setRecoveryEmail({ recoveryEmail: '' }))
    }

    return setEmail
  }, [])

  return (
    <div className={s.checkEmailContainer}>
      <h2 className={s.checkEmail__title}>Check email</h2>
      <img className={s.checkEmail__img} src={emailIcon} alt="emailIcon" />
      <p className={s.checkEmail__text}>
        {`We've sent an Email with instructions to ${recoveryEmail}`}
      </p>
      <CustomButton onClick={onClickNavigate}>
        <p>Back to login</p>
      </CustomButton>
    </div>
  )
}
