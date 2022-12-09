import { AppDispatchType, RootStateType } from '../app/store'
import { useDispatch, useSelector } from 'react-redux'

import type { TypedUseSelectorHook } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
