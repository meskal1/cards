import * as React from 'react'

import { BorderColor, CameraAlt, KeyboardBackspace } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'

import { CustomButton } from '../../common/components/CustomButton/CustomButton'
import { PATH } from '../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { logOutTC } from '../auth/authSlice'

import s from './Profile.module.scss'
import { InitialProfileType } from './profileReducer'

type ProfileType = {}

export const Profile: React.FC<ProfileType> = ({}) => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()

  const profile = useAppSelector<InitialProfileType>(state => state.profile)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [avatar, setAvatar] = React.useState('')

  const onLogOutHandler = () => {
    dispatch(logOutTC())
  }
  const addPhotoHandler = () => alert('add photo')
  const editNameHandler = () => alert('edit name')
  const backToPacsHandler = () => {
    navigate(PATH.PACKS)
  }

  if (!isLoggedIn) {
    navigate(PATH.LOGIN)
  }

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <div className={s.backToPacks} onClick={backToPacsHandler}>
        <div className={s.ProfileContainer__arrow}>
          <KeyboardBackspace />
        </div>
        <div className={s.backToPacks__PacksLink}>Back to Pacs List</div>
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
          <CustomButton onClick={onLogOutHandler} className={s.ProfileContainer__logOutBtn}>
            Log Out
          </CustomButton>
        </div>
      </div>
    </div>
  )
}
