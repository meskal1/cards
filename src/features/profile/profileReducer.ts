const initialState = {
  name: '',
  email: '',
  avatar: '',
}

export const profileReducer = (
  state: InitialProfileType = initialState,
  action: ActionType
): InitialProfileType => {
  switch (action.type) {
    case 'SET-PROFILE':
      return {
        name: action.payload.name,
        avatar: action.payload.avatar,
        email: action.payload.email,
      }
    default:
      return state
  }
}

//actions

export const setProfile = (profile: { name: string; email: string; avatar: string | undefined }) =>
  ({ type: 'SET-PROFILE', payload: profile } as const)

//thunks

// types

export type InitialProfileType = {
  name: string
  email: string
  avatar: string | undefined
}

type ActionType = ReturnType<typeof setProfile>
