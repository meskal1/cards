import React, { useEffect, useState } from 'react'

import { BorderColor, CameraAlt, KeyboardBackspace } from '@mui/icons-material'

import { ButtonStyled } from '../../common/components/ButtonStyled/ButtonStyled'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { authAPI } from '../../services/authApi'

import s from './Profile.module.scss'
import { authMe, InitialProfileType } from './profileReducer'

type ProfileType = {}

export const Profile: React.FC<ProfileType> = ({}) => {
  const dispatch = useAppDispatch()

  const profile = useAppSelector<InitialProfileType>(state => state.profile)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    dispatch(authMe())
  }, [])
  const onLogOutHandler = () => alert('Log Out')
  const addPhotoHandler = () => alert('add photo')
  const editNameHandler = () => alert('edit name')
  const backToPacsHandler = () => alert('bac to packs')

  console.log(profile)

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <div className={s.backToPacks}>
        <div className={s.ProfileContainer__arrow}>
          <KeyboardBackspace />
        </div>
        <div className={s.backToPacks__PacksLink} onClick={backToPacsHandler}>
          Back to Pacs List
        </div>
      </div>
      <div className={s.ProfileBox}>
        <div className={s.ProfileContainer}>
          <h1 className={s.ProfileContainer__title}>Personal Information</h1>
          <div className={s.ProfileContainer__image}>
            <img src={avatar} alt="avatar" />
            <div className={s.ProfileContainer__addPhoto} onClick={addPhotoHandler}>
              <CameraAlt />
            </div>
          </div>
          <div className={s.nameContainer}>
            <div className={s.ProfileContainer__name}>
              <h2>{profile.name}</h2>
              <span className={s.ProfileContainer__edit} onClick={editNameHandler}>
                <BorderColor />
              </span>
            </div>
          </div>
          <p className={s.ProfileContainer__email}>{profile.email}</p>
          <ButtonStyled name={'Log Out'} onClick={onLogOutHandler} color={'white'} />
        </div>
      </div>
    </div>
  )
}
