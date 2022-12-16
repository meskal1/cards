import * as yup from 'yup'

const name = yup.string().required('required')
const email = yup.string().email('enter a valid email').required('email is required')
const password = yup
  .string()
  .min(8, 'password must contain at least 8 characters')
  .required('enter your password')
const confirmPassword = yup
  .string()
  .oneOf([yup.ref('password')], 'password does not match')
  .required('confirm your password')
const rememberMe = yup.boolean()

export const validationSchemaLogin = yup.object({ email, password, rememberMe })

export const validationSchemaRegistration = yup.object({ email, password, confirmPassword })

export const validationSchemaProfile = yup.object({ name })

export const validationSchemaNewPassword = yup.object({ password })

export const validationSchemaForgotPassword = yup.object({ email })
