import { memo, useState, MouseEvent, ChangeEvent, KeyboardEvent, FC } from 'react'

import { BorderColor, Send } from '@mui/icons-material'

import { useAppSelector } from '../../../hooks/reduxHooks'
import { CustomInput } from '../CustomInput/CustomInput'

import s from './EditableSpan.module.scss'

type EditableSpanType = {
  changeName: (name: string) => void
}

export const EditableSpan: FC<EditableSpanType> = memo(({ changeName }) => {
  const name = useAppSelector(state => state.profile.userData.name)
  const [inputValue, setInputValue] = useState(name)
  const [isInEditMode, setIsInEditMode] = useState(false)
  const [errorEmptyField, setErrorEmptyField] = useState(false)
  const [errorStyleButton, setErrorStyleButton] = useState('')

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

  const handleSetNewName = (e?: MouseEvent<SVGSVGElement>) => {
    e?.preventDefault()
    if (inputValue.trim() === '') {
      setErrorEmptyField(true)
      setErrorStyleButton(s.errorButton)

      return
    } else {
      setIsInEditMode(false)
    }

    if (inputValue.trim() !== name) {
      changeName(inputValue.trim())
    }
  }

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.value.trim() !== '') {
      setErrorEmptyField(false)
    }
    setInputValue(e.currentTarget.value)
  }

  const onBlurInput = () => {
    setInputValue(name)
    setIsInEditMode(false)
    setErrorEmptyField(false)
  }

  const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
