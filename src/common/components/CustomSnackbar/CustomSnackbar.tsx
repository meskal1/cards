import React from 'react'

import { Alert, Snackbar } from '@mui/material'

import { setAppAlertMessage } from '../../../app/appSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

type CustomSnackbarPropsType = {}

export const CustomSnackbar: React.FC<CustomSnackbarPropsType> = ({}) => {
  const alertMessage = useAppSelector(state => state.app.alertMessage)
  const isOpen = alertMessage.messageText !== null

  const dispatch = useAppDispatch()

  const handleClose = (event?: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(setAppAlertMessage({ messageType: alertMessage.messageType, messageText: null }))
  }

  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      {/* Condition is required to get rid of showing empty alert before snackbar finish closing */}
      {alertMessage.messageText ? (
        <Alert onClose={handleClose} severity={alertMessage.messageType}>
          {alertMessage.messageText}
        </Alert>
      ) : (
        <div></div>
      )}
    </Snackbar>
  )
}
