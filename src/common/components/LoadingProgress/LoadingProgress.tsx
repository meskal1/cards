import { CircularProgress, Box } from '@mui/material'

import s from './LoadingProgress.module.scss'

export const LoadingProgress = () => {
  return (
    <>
      <Box className={s.circularProgress}>
        <CircularProgress />
      </Box>
    </>
  )
}
