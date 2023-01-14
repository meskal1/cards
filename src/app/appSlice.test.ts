import {
  AlertMessageType,
  AppAlertMessageTextType,
  appReducer,
  AppStateType,
  initializeAppTC,
  RequestStatusType,
  setAppAlertMessage,
  setAppStatus,
} from './appSlice'

describe('app reducer tests', () => {
  let initialState: AppStateType

  beforeEach(() => {
    initialState = {
      status: 'idle' as RequestStatusType,
      alertMessage: {
        messageType: 'error' as AlertMessageType,
        messageText: null as AppAlertMessageTextType,
      },
      isInitialized: false,
    }
  })

  test('should return the initial state', () => {
    expect(appReducer(initialState, { type: undefined })).toBe(initialState)
  })

  test('should set status to loading', () => {
    expect(appReducer(initialState, setAppStatus('loading')).status).toBe('loading')
  })

  test('should set status to idle', () => {
    initialState.status = 'loading'
    expect(appReducer(initialState, setAppStatus('idle')).status).toBe('idle')
  })

  test('should set error alert message', () => {
    initialState.alertMessage.messageType = 'success'

    const endState = appReducer(
      initialState,
      setAppAlertMessage({ messageType: 'error', messageText: 'test error message' })
    )

    expect(endState.alertMessage).toEqual({
      messageType: 'error',
      messageText: 'test error message',
    })
  })

  test('should set success alert message', () => {
    const endState = appReducer(
      initialState,
      setAppAlertMessage({ messageType: 'success', messageText: 'test success message' })
    )

    expect(endState.alertMessage).toEqual({
      messageType: 'success',
      messageText: 'test success message',
    })
  })

  test('should set isInitialized to true', () => {
    expect(
      appReducer(initialState, initializeAppTC.fulfilled(undefined, '')).isInitialized
    ).toBeTruthy()
  })
})
