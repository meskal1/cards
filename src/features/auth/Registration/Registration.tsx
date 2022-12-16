import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { RequestStatusType } from '../../../app/appSlice'
import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { CustomInput } from '../../../common/components/CustomInput/CustomInput'
import { CustomPasswordInput } from '../../../common/components/CustomPasswordInput/CustomPasswordInput'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { validationSchemaRegistration } from '../../../utils/validationSchema'
import { registerTC } from '../authSlice'

import s from './Registration.module.scss'

export const Registration = () => {
  const authStatus = useAppSelector<RequestStatusType>(state => state.auth.status)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchemaRegistration,
    onSubmit: async values => {
      const isRegisterSucceed = await dispatch(
        registerTC({ email: values.email, password: values.password })
      )

      if (isRegisterSucceed) {
        navigate(PATH.LOGIN)
      }
    },
  })

  return (
    <div className={s.registration}>
      <form className={s.form} onSubmit={handleSubmit}>
        <h3 className={s.title}>sign up</h3>
        <CustomInput
          label={'email'}
          fullWidth
          autoComplete={'new-password'}
          error={!!errors.email && touched.email}
          helperText={touched.email && errors.email}
          {...getFieldProps('email')}
        />
        <CustomPasswordInput
          label={'Password'}
          autoComplete={'new-password'}
          error={!!errors.password && touched.password}
          helperText={touched.password && errors.password}
          {...getFieldProps('password')}
        />
        <CustomPasswordInput
          label={'Confirm password'}
          autoComplete={'new-password'}
          error={!!errors.confirmPassword && touched.confirmPassword}
          helperText={touched.confirmPassword && errors.confirmPassword}
          {...getFieldProps('confirmPassword')}
        />
        <CustomButton className={s.button} fullWidth disabled={authStatus === 'loading'}>
          sign up
        </CustomButton>
        <p className={s.signInQuestion}>Already have an account?</p>
        <Link className={s.signInLink} to={PATH.LOGIN}>
          sign in
        </Link>
      </form>
    </div>
  )
}
