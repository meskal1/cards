import * as React from 'react'

import { BorderColor, CameraAlt } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useFormik } from 'formik'

import avatarLocal from '../../assets/img/avatar.jpg'
import { BackToPacks } from '../../common/components/BackToPacks/BackToPacks'
import { CustomButton } from '../../common/components/CustomButton/CustomButton'
// eslint-disable-next-line import/namespace
import { EditableSpan } from '../../common/components/EditableSpan/EditableSpan'
import { PATH } from '../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { validationSchemaProfile } from '../../utils/validationSchema'
import { logOutTC } from '../auth/authSlice'

import s from './Profile.module.scss'
import { newUserDataTC } from './profileSlice'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const [isNameEditable, setIsNameEditable] = React.useState(false)

  const name = useAppSelector(state => state.profile.userData.name)
  const email = useAppSelector(state => state.profile.userData.email)
  const avatar = useAppSelector(state => state.profile.userData.avatar)

  const formik = useFormik({
    initialValues: {
      name,
      avatar,
    },
    validationSchema: validationSchemaProfile,
    onSubmit: values => {
      dispatch(newUserDataTC(values))
    },
  })

  const onLogOutHandler = () => {
    dispatch(logOutTC())
  }

  const setNewAvatar = () => alert('add photo')

  const setNewName = () => {
    isNameEditable ? setIsNameEditable(false) : setIsNameEditable(true)
  }

  const changeName = React.useCallback(
    (newName: string) => {
      dispatch(newUserDataTC({ name: newName, avatar }))
    },
    [dispatch]
  )

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
          <div className={s.profile__userName} onBlur={setNewName}>
            <EditableSpan name={name} changeProfile={changeName} />
          </div>
          <p className={s.profile__userEmail}>{email}</p>
          <CustomButton className={s.profile__button} onClick={onLogOutHandler}>
            <LogoutIcon className={s.profile__buttonIcon} />
            <p>log out</p>
          </CustomButton>
        </div>
      </div>
    </>
  )
}
