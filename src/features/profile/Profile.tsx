import { ChangeEvent, useCallback, useEffect } from 'react'

import { setAppAlertMessage } from '../../app/appSlice'
import avatarLocal from '../../assets/img/avatar.jpg'
import { BackToPacks } from '../../common/components/BackToPacks/BackToPacks'
import { CustomButton } from '../../common/components/CustomButton/CustomButton'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { base64Converter } from '../../utils/base64Converter'
import { validateImage } from '../../utils/validationSchema'
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

  const handleUploadAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const base64 = (await base64Converter(e)) as string
    const validateImageData = {
      size: e.target.files[0].size || 0,
      type: e.target.files[0].type || '',
      isImageExist: !!base64,
    }
    const errorMessage = validateImage(validateImageData).deckCover

    if (errorMessage) {
      dispatch(setAppAlertMessage({ messageText: errorMessage, messageType: 'error' }))
    } else {
      dispatch(updateUserDataTC({ avatar: base64 }))
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clearPacksQueryParams())
    }
  }, [])

  return (
    <div className={s.profileContainer}>
      <BackToPacks />
      <div className={s.profile__content}>
        <h2 className={s.profile__title}>Personal information</h2>
        <div className={s.profile__avatarBlock}>
          <div className={s.profile__pic}>
            <img className={s.profile__img} src={avatar || avatarLocal} alt="avatar" />
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
          <p className={s.profile__buttonIcon}>Log out</p>
        </CustomButton>
      </div>
    </div>
  )
}
