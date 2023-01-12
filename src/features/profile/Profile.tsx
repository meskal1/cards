import { ChangeEvent, useCallback, useEffect } from 'react'

import { setAppAlertMessage } from '../../app/appSlice'
import avatarLocal from '../../assets/img/avatar.jpg'
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

  const handleOnLogOut = () => dispatch(logOutTC())

  const handleChangeUserName = useCallback(
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

  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000 && file.type.includes('image')) {
        const reader = new FileReader()

        reader.onload = () => {
          const file64 = reader.result as string

          dispatch(updateUserDataTC({ avatar: file64 }))
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
            <label>
              <input
                type="file"
                onChange={handleUploadAvatar}
                style={{ display: 'none' }}
                accept={'image/*'}
              />
              <div className={s.profile__avatarIcon} />
            </label>
          </div>
          <div className={s.profile__userName}>
            <EditableSpan changeName={handleChangeUserName} />
          </div>
          <p className={s.profile__userEmail}>{email}</p>
          <CustomButton className={s.profile__button} onClick={handleOnLogOut}>
            <p className={s.profile__buttonIcon}>log out</p>
          </CustomButton>
        </div>
      </div>
    </>
  )
}
