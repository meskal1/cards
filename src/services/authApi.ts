import { PATH } from '../constants/routePaths.enum'

import { instance } from './instance'

// API
export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType>('auth/login', data)
  },
  logout() {
    return instance.delete<LogOutResponseType>('auth/me', {})
  },
  me() {
    return instance.post<ResponseType>('auth/me', {})
  },
  register(data: RegisterParamsType) {
    return instance.post<RegisterResponseType>('auth/register', data)
  },
  newPassword(data: CreatePasswordParamsType) {
    return instance.post<CreatePasswordResponseType>('auth/set-new-password', data)
  },
  forgot(email: string) {
    return instance.post<{ info: string }>('auth/forgot', {
      email,
      message: `<div style="background-color: lime; padding: 15px">
                    password recovery link: 
                    <a href='${process.env.REACT_APP_NEW_PASSWORD_URL}#${PATH.NEW_PASSWORD}/$token$'>link</a>
                  </div>`,
    })
  },
  newUserData(data: ProfileDataType) {
    return instance.put<ProfileDataResponseType>('auth/me', data)
  },
  editProfile(profile: EditProfileType) {
    return instance.put<ResponseType>('auth/me', profile)
  },
}

// TYPES
export type EditProfileType = {
  name: string
  avatar: string | undefined
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
}

export type UserType = {
  _id: string
  email: string
  rememberMe: boolean
  name: string
  publicCardPacksCount: number
  created: string
  updated: string
  avatar: string
}

export type RegisterParamsType = Omit<LoginParamsType, 'rememberMe'>

export type RegisterResponseType = RegisterSuccessResponseType

export type RegisterSuccessResponseType = {
  addedUser: AddedUserType
}

export type RegisterFailResponseType = {
  error: string
  email: string
  in: string
}

export type AddedUserType = Omit<UserType, 'avatar'>

export type ResponseType = {
  _id: string
  email: string
  name: string
  avatar?: string
  publicCardPacksCount: number
  created: string
  updated: string
  isAdmin: boolean
  verified: boolean
  rememberMe: boolean
  error?: string
  token: string
  tokenDeathTime: number
  __v: number
}

type LogOutResponseType = {
  info: string
}

export type LoginFailResponseType = RegisterFailResponseType

export type AuthMeFailResponseType = {
  in: string
  error: string
}

export type CreatePasswordParamsType = {
  password: string
  resetPasswordToken: string
}

type CreatePasswordResponseType = {
  info: string
  error: string
}

export type ProfileDataType = {
  name?: string
  avatar?: string | undefined
}

type ProfileDataResponseType = {
  token: string
  tokenDeathTime: number
  updatedUser: ResponseType
}
