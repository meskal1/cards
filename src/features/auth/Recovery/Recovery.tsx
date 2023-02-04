import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { RequestStatusType } from '../../../app/appSlice'
import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { CustomInput } from '../../../common/components/CustomInput/CustomInput'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { validationSchemaForgotPassword } from '../../../utils/validationSchema'
import { forgotPasswordTC } from '../authSlice'

import s from './Recovery.module.scss'

export const Recovery = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const authStatus = useAppSelector<RequestStatusType>(state => state.auth.status)

  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchemaForgotPassword,
    onSubmit: async values => {
      const isForgotPasswordSucceeded = await dispatch(forgotPasswordTC(values.email))

      if (isForgotPasswordSucceeded.payload) {
        navigate(PATH.CHECK_EMAIL)
      }
    },
  })

  return (
    <div className={s.forgotPassword}>
      <h2 className={s.title}>Forgot your password?</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <CustomInput
          label={'Email'}
          error={!!errors.email && touched.email}
          helperText={touched.email && errors.email}
          {...getFieldProps('email')}
        />
        <p className={s.help}>Enter your email address and we will send you further instructions</p>
        <CustomButton disabled={authStatus === 'loading'} fullWidth>
          <p>Send instructions</p>
        </CustomButton>
      </form>
      <p className={s.forgotQuestion}>Have you remembered your password?</p>
      <Link className={s.forgotLink} to={PATH.LOGIN}>
        Try logging in
      </Link>
    </div>
  )
}
