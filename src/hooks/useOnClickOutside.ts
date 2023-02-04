import { RefObject, useCallback, useEffect } from 'react'

export const useOnClickOutside = (
  close: () => void,
  childRef: RefObject<HTMLElement>,
  parentRef?: RefObject<HTMLElement>
) => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (
        childRef?.current?.contains &&
        !childRef.current.contains(e.target as Node) &&
        !parentRef?.current?.contains(e.target as Node)
      ) {
        close()
      }
    },
    [close, childRef, parentRef]
  )

  useEffect(() => {
    document.addEventListener('mouseup', handleClick)

    return () => {
      document.removeEventListener('mouseup', handleClick)
    }
  }, [handleClick])
}
