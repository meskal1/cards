import { useNavigate } from 'react-router'

import image404 from '../../assets/img/404.svg'
import { CustomButton } from '../../common/components/CustomButton/CustomButton'
import { PATH } from '../../constants/routePaths.enum'

import s from './Page404.module.scss'

export const Page404 = () => {
  const navigate = useNavigate()

  const handleClickNavigate = () => navigate(PATH.PACKS)

  return (
    <div className={s.page404Container}>
      <img className={s.page404__img} src={image404} alt="error404" />
      <h1 className={s.page404__title}>Page not found!</h1>
      <CustomButton className={s.button} onClick={handleClickNavigate}>
        <p>Back to home page</p>
      </CustomButton>
    </div>
  )
}
