import { useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

import { RootStateType } from '../app/store'

export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
