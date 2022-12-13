import React from 'react'

import { ButtonStyled } from '../../common/components/ButtonStyled/ButtonStyled'

import s from './Profile.module.scss'

type ProfileType = {}

export const Profile: React.FC<ProfileType> = ({}) => {
  const onLogOutHandler = () => alert('Log Out')

  return (
    <div className={s.ProfileContainer}>
      <h1 className={s.ProfileContainer__title}>Personal Information</h1>
      <div className={s.ProfileContainer__image}>
        <img src="" alt="avatar" />
      </div>
      <h2 className={s.ProfileContainer__name}>Ivan</h2>
      <p className={s.ProfileContainer__email}>j&jonson@gmail.com</p>
      <ButtonStyled name={'Log Out'} onClick={onLogOutHandler} color={'white'} />
    </div>
  )
}
