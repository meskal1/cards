import { ChangeEvent, useCallback, useEffect } from 'react'

import { CameraAlt } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { setAppAlertMessage } from '../../app/appSlice'
import avatarLocal from '../../assets/img/avatar.jpg'
import logout from '../../assets/img/icons/logout.svg'
import { BackToPacks } from '../../common/components/BackToPacks/BackToPacks'
import { CustomButton } from '../../common/components/CustomButton/CustomButton'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { logOutTC } from '../auth/authSlice'
import { clearPacksQueryParams } from '../packs/packsSlice'

import s from './Profile.module.scss'
import { updateUserDataTC } from './profileSlice'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const email = useAppSelector(state => state.profile.userData.email)
  const avatar = useAppSelector(state => state.profile.userData.avatar)

  const onLogOutHandler = () => {
    dispatch(logOutTC())
  }

  const changeUserName = useCallback(
    (newName: string) => {
      dispatch(updateUserDataTC({ name: newName }))
    },
    [dispatch]
  )

  useEffect(() => {
    return () => {
      dispatch(clearPacksQueryParams())
    }
  }, [])

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      console.log('FILE: ', file)

      if (file.size < 4000000 && file.type.includes('image')) {
        const reader = new FileReader()

        reader.onload = () => {
          const file64 = reader.result as string

          dispatch(updateUserDataTC({ avatar: file64 }))
          console.log('IMAGE: ', file64)
        }

        reader.readAsDataURL(file)
      } else {
        dispatch(setAppAlertMessage({ messageText: 'image is invalid', messageType: 'error' }))
      }
    }
  }

  const handleInputAvatarError = () => {
    //dispatch(setAppAlertMessage({ messageText: 'image is invalid', messageType: 'error' }))
  }

  return (
    <>
      <div className={s.profileContainer}>
        <BackToPacks />
        <div className={s.profile__content}>
          <h2 className={s.profile__title}>personal information</h2>
          <div className={s.profile__avatarBlock}>
            <div className={s.profile__pic}>
              <img
                className={s.profile__img}
                src={avatar ? avatar : avatarLocal}
                alt="avatar"
                onError={handleInputAvatarError}
              />
            </div>
            <label className={s.profile__label}>
              <input
                type="file"
                onChange={handleUpload}
                style={{ display: 'none' }}
                accept={'image/*'}
              />
              <IconButton component={'span'}>
                <CameraAlt className={s.profile__avatarIcon} />
              </IconButton>
            </label>
          </div>
          <div className={s.profile__userName}>
            <EditableSpan changeName={changeUserName} />
          </div>
          <p className={s.profile__userEmail}>{email}</p>
          <CustomButton className={s.profile__button} onClick={onLogOutHandler}>
            <img className={s.profile__buttonIcon} src={logout} alt="logout" />
            <p>log out</p>
          </CustomButton>
        </div>
      </div>
    </>
  )
}
