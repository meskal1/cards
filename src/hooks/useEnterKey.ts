import { useCallback, useEffect } from 'react'

export const useEnterKey = (handleClose: () => void) => {
  const handleEnterKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleClose()
      }
    },
    [handleClose]
  )

  useEffect(() => {
    document.addEventListener('keyup', handleEnterKey, false)

    return () => {
      document.removeEventListener('keyup', handleEnterKey, false)
    }
  }, [handleEnterKey])
}
