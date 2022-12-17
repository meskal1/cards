import * as React from 'react'

import { BorderColor, Send } from '@mui/icons-material'

import { setAppAlertMessage } from '../../../app/appSlice'
import { useAppDispatch } from '../../../hooks/reduxHooks'
import { CustomInput } from '../CustomInput/CustomInput'

import s from './EditableSpan.module.scss'

type EditableSpanType = {
  name: string
  changeProfile: (name: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = ({ name, changeProfile }) => {
  const [title, setTitle] = React.useState(name)
  const [edit, setEdit] = React.useState(false)

  const dispatch = useAppDispatch()

  const changeEditHandler = () => {
    if (edit) {
      if (!title) {
        dispatch(setAppAlertMessage({ messageType: 'error', messageText: 'name is required! ' }))

        return
      }
      changeProfile(title)
    }
    setEdit(!edit)
  }
  const changeTitleHandler = (newTitle: string) => setTitle(newTitle)

  return (
    <div className={s.Container} onBlur={changeEditHandler}>
      {edit ? (
        <div className={s.NameContainer}>
          <div className={s.InputContainer}>
            <CustomInput
              value={title}
              onChange={event => changeTitleHandler(event.currentTarget.value)}
              className={s.InputField}
              autoFocus={true}
            />
          </div>

          <div className={s.SendMarker}>
            <Send className={s.Marker} />
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
}
