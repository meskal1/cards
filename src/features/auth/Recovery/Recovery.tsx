import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'

import { CustomButton } from '../../../common/components/CustomButton/CustomButton'
import { CustomInput } from '../../../common/components/CustomInput/CustomInput'
import { PATH } from '../../../constants/routePaths.enum'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { validationSchemaForgotPassword } from '../../../utils/validationSchema'
import { forgotPasswordTC } from '../authSlice'

import s from './Recovery.module.scss'

export const Recovery = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { handleSubmit, getFieldProps, errors, touched } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchemaForgotPassword,
    onSubmit: async values => {
      const isForgotPasswordSucceed = await dispatch(forgotPasswordTC(values.email))

      if (isForgotPasswordSucceed) {
        navigate(PATH.CHECK_EMAIL)
      }
    },
  })

  return (
    <div className={s.forgotPassword}>
      <form className={s.form} onSubmit={handleSubmit}>
        <h3 className={s.title}>Forgot your password?</h3>
        <CustomInput
          className={s.input}
          label={'email'}
          error={!!errors.email && touched.email}
          helperText={touched.email && errors.email}
          {...getFieldProps('email')}
        />
        <p className={s.help}>Enter your email address and we will send you further instructions</p>
        <CustomButton className={s.button} fullWidth>
          Send instructions
        </CustomButton>
        <p className={s.forgotQuestion}>Have you remembered your password?</p>
        <Link className={s.forgotLink} to={PATH.LOGIN}>
          Try logging in
        </Link>
      </form>
    </div>
  )
}
