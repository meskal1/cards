import * as yup from 'yup'

const email = yup
  .string()
  .email('Enter a valid email')
  .max(50, 'Enter a valid email')
  .required('Email is required')
const password = yup
  .string()
  .min(8, 'Password must contain at least 8 characters')
  .max(30, 'Password is too long')
  .required('Enter your password')
const confirmPassword = yup
  .string()
  .oneOf([yup.ref('password')], 'Password does not match')
  .required('Confirm your password')
const rememberMe = yup.boolean()
const question = yup
  .string()
  .max(100, 'Question should be less then 100 characters')
  .required('Question is required')
const answer = yup
  .string()
  .max(100, 'Answer should be less then 100 characters')
  .required('Answer is required')
const packName = yup
  .string()
  .max(100, 'Name should be less then 100 characters')
  .required('Pack name is required')

export const login = yup.object({ email, password, rememberMe })

export const registration = yup.object({ email, password, confirmPassword })

export const newPassword = yup.object({ password })

export const forgotPassword = yup.object({ email })

export const newCardText = yup.object({ question, answer })

export const newPackText = yup.object({ name: packName })

export const validateImage = (imgData: ValidateImageType) => {
  const formats = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp', 'image/svg']
  const error: { questionImg?: string; deckCover?: string } = {}

  if (imgData.selectedItem && !imgData.size && !imgData.isImageExist) {
    error.questionImg = 'Question image is required'

    return error
  }

  if (imgData.type && !new RegExp(imgData.type, 'gi').test(formats.join(','))) {
    error.questionImg = 'Unsupported file format'
    error.deckCover = 'Unsupported file format'

    return error
  }

  if (imgData.size && imgData.size > 100000) {
    error.questionImg = 'File size is more than 100kb'
    error.deckCover = 'File size is more than 100kb'

    return error
  }

  return error
}

type ValidateImageType = {
  size: number
  type: string
  selectedItem?: boolean
  isImageExist: boolean
}
