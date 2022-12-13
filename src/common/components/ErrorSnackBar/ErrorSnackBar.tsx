import React from 'react'

import { Alert, Snackbar } from '@mui/material'

import { AppErrorType, setAppError } from '../../../app/appSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

export const ErrorSnackBar = () => {
  const error = useAppSelector<AppErrorType>(state => state.app.error)
  const isOpen = error !== null

  const dispatch = useAppDispatch()

  const handleClose = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppError({ error: null }))
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {error}
      </Alert>
    </Snackbar>
  )
}
