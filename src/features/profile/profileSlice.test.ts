import { profileReducer, ProfileStateType, setUserData, UserDataType } from './profileSlice'

let initialState: ProfileStateType

describe('profile reducer tests', () => {
  beforeEach(() => {
    initialState = {
      userData: {
        id: '',
        name: '',
        email: '',
        avatar: undefined,
      },
    }
  })

  test('should return the initial state', () => {
    expect(profileReducer(initialState, { type: undefined })).toBe(initialState)
  })

  test('should set userData correctly', () => {
    const userData: UserDataType = {
      id: '1',
      name: 'Petya',
      email: 'petya@mail.ru',
      avatar: 'petyaAva.jpg',
    }

    const endState = profileReducer(initialState, setUserData(userData))

    expect(endState.userData).toEqual(userData)
  })

  test('should initialize userData correctly', () => {
    const userData: UserDataType = {
      id: '1',
      name: '',
      email: '',
      avatar: undefined,
    }

    const endState = profileReducer(initialState, setUserData(userData))

    expect(endState.userData).toEqual(userData)
  })
})
