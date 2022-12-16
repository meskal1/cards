import { BorderColor, CameraAlt, KeyboardBackspace } from '@mui/icons-material'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link, useNavigate } from 'react-router-dom'

import { CustomButton } from '../../common/components/CustomButton/CustomButton'
import { PATH } from '../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { logOutTC } from '../auth/authSlice'

import s from './Profile.module.scss'
import { UserDataType } from './profileSlice'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const navigate = useNavigate()

  const name = useAppSelector(state => state.profile.userData.name)
  const email = useAppSelector(state => state.profile.userData.email)
  const avatar = useAppSelector(state => state.profile.userData.avatar)

  const onLogOutHandler = () => {
    dispatch(logOutTC())
  }
  const addPhotoHandler = () => alert('add photo')
  const editNameHandler = () => alert('edit name')

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
          <div className={s.profile__avatarBlock} onClick={addPhotoHandler}>
            <div className={s.profile__pic}>
              <img
                className={s.profile__img}
                src={
                  avatar ||
                  `https://avatars.mds.yandex.net/get-kino-vod-films-gallery/28788/47e2fd514411e18b76af786d7417062d/100x64_3`
                }
                alt="avatar"
              />
            </div>
            <CameraAlt className={s.profile__avatarIcon} />
          </div>
          <p className={s.profile__userName}>
            {name}
            <BorderColor className={s.profile__marker} onClick={editNameHandler} />
          </p>
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
