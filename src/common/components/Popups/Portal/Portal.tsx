import { FC, useState, useEffect, ReactNode } from 'react'

import { createPortal } from 'react-dom'

import './Portal.scss'

type PortalType = {
  children: ReactNode
}

export const Portal: FC<PortalType> = ({ children }) => {
  const [container] = useState(() => document.createElement('div'))

  container.className = 'portal'

  useEffect(() => {
    document.body.appendChild(container)
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.removeChild(container)
      document.body.removeAttribute('style')
    }
  }, [])

  return createPortal(children, container)
}
