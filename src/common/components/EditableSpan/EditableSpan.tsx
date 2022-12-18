import * as React from 'react'
import { MutableRefObject, useEffect, useRef } from 'react'

import { BorderColor, Send } from '@mui/icons-material'

import { setAppAlertMessage } from '../../../app/appSlice'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { CustomInput } from '../CustomInput/CustomInput'

import s from './EditableSpan.module.scss'

type EditableSpanType = {
  name: string
  changeProfile: (name: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanType) => {
  const { name, changeProfile } = props
  const inputRef = React.createRef() as MutableRefObject<HTMLDivElement>
  const submitRef = React.createRef() as MutableRefObject<SVGSVGElement>

  useEffect(() => {
    const onMouseDownHandler = (e: MouseEvent) => {
      console.log('e: ', e.currentTarget)
      console.log('EvenetListener: ', e.target)
      if (e.target !== inputRef.current) {
        setEdit(false)
      }
      if (e.target == submitRef.current) {
        debugger
        submitNewNameHandler()
      }
    }

    document.addEventListener('mousedown', onMouseDownHandler)

    return () => {
      document.removeEventListener('mousedown', onMouseDownHandler)
    }
  }, [])
  const [inputValue, setInputValue] = React.useState(name)
  const [edit, setEdit] = React.useState(false)

  const dispatch = useAppDispatch()

  const changeEditHandler = () => {
    setEdit(!edit)
  }

  const submitNewNameHandler = () => {
    const trimmedValue = inputValue.trim()

    if (!trimmedValue) {
      dispatch(setAppAlertMessage({ messageType: 'error', messageText: 'name is required! ' }))

      return
    }
    changeProfile(trimmedValue)
    setEdit(false)
  }
  const changeInputValueHandler = (newTitle: string) => setInputValue(newTitle)

  return (
    <div className={s.Container}>
      {edit ? (
        <div className={s.NameContainer}>
          <div className={s.InputContainer}>
            <CustomInput
              ref={inputRef}
              value={inputValue}
              onChange={event => changeInputValueHandler(event.currentTarget.value)}
              className={s.InputField}
              autoFocus={true}
            />
          </div>

          <div className={s.SendMarker}>
            <Send className={s.Marker} onClick={submitNewNameHandler} ref={submitRef} />
          </div>
        </div>
      ) : (
        <p>
          <span className={s.InputContainer}>{name}</span>
          <BorderColor className={s.Marker} onClick={changeEditHandler} />
        </p>
      )}
    </div>
  )
})
