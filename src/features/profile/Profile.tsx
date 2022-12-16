import { useState } from 'react'

import { BorderColor, CameraAlt, KeyboardBackspace } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import avatarLocal from '../../assets/img/avatar.jpg'
import { CustomButton } from '../../common/components/CustomButton/CustomButton'
import { CustomInput } from '../../common/components/CustomInput/CustomInput'
import { PATH } from '../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { validationSchemaProfile } from '../../utils/validationSchema'
import { logOutTC } from '../auth/authSlice'

import s from './Profile.module.scss'
import { newUserDataTC } from './profileSlice'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()
  const [isNameEditable, setIsNameEditable] = useState(false)

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

  if (!isLoggedIn) {
    navigate(PATH.LOGIN)
  }

  return (
    <>
      <div className={s.profileContainer}>
        <Link className={s.profile__linkPacks} to={PATH.PACKS}>
          <KeyboardBackspace className={s.profile__arrow} />
          Back to pacs list
        </Link>
        <div className={s.profile__content}>
          <h2 className={s.profile__title}>personal information</h2>
          <form className={s.profile__form} onSubmit={formik.handleSubmit}>
            <div className={s.profile__avatarBlock} onClick={setNewAvatar}>
              <div className={s.profile__pic}>
                <img className={s.profile__img} src={avatarLocal || avatar} alt="avatar" />
              </div>
              <CameraAlt className={s.profile__avatarIcon} />
            </div>
            <p className={s.profile__userName} onBlur={setNewName}>
              {isNameEditable ? (
                <CustomInput
                  className={s.profile__field}
                  label="name"
                  error={formik.touched.name && !!formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                  {...formik.getFieldProps('name')}
                />
              ) : (
                name
              )}
              <BorderColor className={s.profile__marker} onClick={setNewName} />
            </p>
          </form>
          <p className={s.profile__userEmail}>{email}</p>
          <CustomButton className={s.profile__button} onClick={onLogOutHandler}>
            <LogoutIcon className={s.profile__buttonIcon} />
            Log out
          </CustomButton>
        </div>
      </div>
    </>
  )
}
