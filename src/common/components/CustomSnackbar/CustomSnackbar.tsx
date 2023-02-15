import { SyntheticEvent } from 'react'

import { Alert, Box, Snackbar } from '@mui/material'

import { setAppAlertMessage } from '../../../app/appSlice'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../hooks/useAppSelector'

export const CustomSnackbar = () => {
  const alertMessage = useAppSelector(state => state.app.alertMessage)
  const isOpen = alertMessage.messageText !== null

  const dispatch = useAppDispatch()

  const handleClose = (event?: Event | SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    dispatch(setAppAlertMessage({ messageType: alertMessage.messageType, messageText: null }))
  }

  return (
    <Box position={'absolute'}>
      <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
        {/* Condition is required to get rid of showing empty alert before snackbar finish closing */}
        {alertMessage.messageText ? (
          <Alert onClose={handleClose} severity={alertMessage.messageType}>
            {alertMessage.messageText}
          </Alert>
        ) : (
          <div></div>
        )}
      </Snackbar>
    </Box>
  )
}
