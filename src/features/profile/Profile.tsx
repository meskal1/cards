import { useCallback, useEffect } from 'react'

import { CameraAlt } from '@mui/icons-material'

import avatarLocal from '../../assets/img/avatar.jpg'
import logout from '../../assets/img/icons/logout.svg'
import { BackToPacks } from '../../common/components/BackToPacks/BackToPacks'
import { CustomButton } from '../../common/components/CustomButton/CustomButton'
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { logOutTC } from '../auth/authSlice'
import { clearPacksQueryParams } from '../packs/packsSlice'

import s from './Profile.module.scss'
import { newUserDataTC } from './profileSlice'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const email = useAppSelector(state => state.profile.userData.email)
  const avatar = useAppSelector(state => state.profile.userData.avatar)

  const onLogOutHandler = () => {
    dispatch(logOutTC())
  }

  const setNewAvatar = () => alert('add photo')

  const changeUserName = useCallback(
    (newName: string) => {
      dispatch(newUserDataTC({ name: newName, avatar }))
    },
    [dispatch]
  )

  useEffect(() => {
    return () => {
      dispatch(clearPacksQueryParams())
    }
  }, [])

  return (
    <>
      <div className={s.profileContainer}>
        <BackToPacks />
        <div className={s.profile__content}>
          <h2 className={s.profile__title}>personal information</h2>
          <div className={s.profile__avatarBlock} onClick={setNewAvatar}>
            <div className={s.profile__pic}>
              <img className={s.profile__img} src={avatarLocal || avatar} alt="avatar" />
            </div>
            <CameraAlt className={s.profile__avatarIcon} />
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
