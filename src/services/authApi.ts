import axios, { AxiosResponse } from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

// API
const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
})

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<LoginParamsType, AxiosResponse<ResponseType>>('', data)
  },
  logout() {
    return instance.delete<ResponseType>('')
  },
  me() {
    return instance.get<ResponseType>('')
  },
}

// TYPES
export type LoginParamsType = {}

export type AuthMeType = {}

export type ResponseType = {}
