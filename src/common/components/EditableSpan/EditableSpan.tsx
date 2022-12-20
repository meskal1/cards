import * as React from 'react'

import { BorderColor, Send } from '@mui/icons-material'

import { useAppSelector } from '../../../hooks/reduxHooks'
import { CustomInput } from '../CustomInput/CustomInput'

import s from './EditableSpan.module.scss'

type EditableSpanType = {
  changeName: (name: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = React.memo(({ changeName }) => {
  const name = useAppSelector(state => state.profile.userData.name)
  const [inputValue, setInputValue] = React.useState(name)
  const [isInEditMode, setIsInEditMode] = React.useState(false)
  const [errorEmptyField, setErrorEmptyField] = React.useState(false)
  const [errorStyleButton, setErrorStyleButton] = React.useState('')

  const handleAnimationEndError = () => {
    setErrorStyleButton('')
  }

  const handleErrorSetNewName = () => {
    if (errorEmptyField) {
      setErrorStyleButton(s.errorButton)
    }
  }

  const handleEditMode = () => {
    setInputValue(inputValue.trim())
    setIsInEditMode(true)
  }

  const handleSetNewName = () => {
    if (inputValue.trim() === '') {
      setErrorEmptyField(true)

      return
    }

    if (inputValue.trim() !== name) {
      changeName(inputValue.trim())
    }

    setIsInEditMode(false)
  }

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.trim() !== '') {
      setErrorEmptyField(false)
    }
    setInputValue(e.currentTarget.value)
  }

  const onBlurInput = (e?: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (inputValue.trim() === '') {
      e?.preventDefault()
      setErrorEmptyField(true)

      return
    }

    setInputValue(name)
    setIsInEditMode(false)
    setErrorEmptyField(false)
  }

  const onKeyDownInputHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSetNewName()
    }

    if (e.key === 'Escape') {
      onBlurInput()
    }
  }

  return (
    <>
      {isInEditMode ? (
        <div className={s.inputContainer}>
          <CustomInput
            value={inputValue}
            onBlur={onBlurInput}
            onKeyDown={onKeyDownInputHandler}
            onChange={onChangeInputHandler}
            autoFocus={true}
            autoComplete={'new-password'}
            error={errorEmptyField}
            InputProps={{
              inputProps: { style: { textAlign: 'center' } },
            }}
          />
          <Send
            className={`${s.sendButton} ${errorStyleButton}`}
            onMouseDown={handleSetNewName}
            onClick={handleErrorSetNewName}
            onAnimationEnd={handleAnimationEndError}
          />
        </div>
      ) : (
        <span className={s.userName}>
          {name}
          <BorderColor className={s.marker} onClick={handleEditMode} />
        </span>
      )}
    </>
  )
})
