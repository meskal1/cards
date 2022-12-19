import * as React from 'react'

import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router'

import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { CustomPasswordInput } from '../../../common/components/CustomPasswordInput/CustomPasswordInput'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { validationSchemaNewPassword } from '../../../utils/validationSchema'
import { createPasswordTC } from '../authSlice'

import s from './NewPassword.module.scss'

export const NewPassword = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const passwordIsChanged = useAppSelector(state => state.auth.passwordIsChanged)

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchemaNewPassword,
    onSubmit: values => {
      console.log(token)
      dispatch(createPasswordTC({ password: values.password, resetPasswordToken: token! }))
    },
  })

  React.useEffect(() => {
    if (passwordIsChanged) {
      formik.resetForm()
      navigate(PATH.LOGIN)
    }
  }, [passwordIsChanged])

  return (
    <>
      <div className={s.setPasswordContainer}>
        <h2 className={s.setPassword__title}>create new password</h2>
        <form className={s.setPassword__form} onSubmit={formik.handleSubmit}>
          <CustomPasswordInput
            label="password"
            error={formik.touched.password && !!formik.errors.password}
            helperText={formik.touched.password && formik.errors.password}
            {...formik.getFieldProps('password')}
          />
          <p className={s.setPassword__text}>
            create new password and we will send you further instructions to email
          </p>
          <CustomButton>
            <p>create new password</p>
          </CustomButton>
        </form>
      </div>
    </>
  )
}
