import React, { FC, ImgHTMLAttributes, useState } from 'react'

import { OverlayingPopup } from '../Popups/OverlayingPopup/OverlayingPopup'

import s from './ClickableImage.module.scss'

type PropsType = ImgHTMLAttributes<HTMLImageElement> & {
  src: string
}

export const ClickableImage: FC<PropsType> = ({ className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isImageBroken, setIsImageBroken] = useState(false)
  const smallImageClassName = className ? `${className} ${s.smallImg}` : s.smallImg

  const handleImageOpen = () => setIsOpen(true)
  const handleImageClose = () => setIsOpen(false)
  const handleImageError = () => setIsImageBroken(true)

  return (
    <>
      <img
        className={smallImageClassName}
        onClick={handleImageOpen}
        onError={handleImageError}
        {...props}
      />
      {!isImageBroken && (
        <OverlayingPopup isOpened={isOpen} onClose={handleImageClose}>
          <img className={s.fullSizedImg} src={props.src} />
        </OverlayingPopup>
      )}
    </>
  )
}
