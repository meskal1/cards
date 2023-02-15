import { memo, useState, MouseEvent, ChangeEvent, KeyboardEvent, FC } from 'react'

import { useAppSelector } from '../../../hooks/useAppSelector'
import { cutSpaces } from '../../../utils/cutSpaces'
import { CustomInput } from '../CustomInput/CustomInput'

import s from './EditableSpan.module.scss'

type EditableSpanType = {
  changeName: (name: string) => void
}

export const EditableSpan: FC<EditableSpanType> = memo(({ changeName }) => {
  const name = useAppSelector(state => state.profile.userData.name)
  const [inputValue, setInputValue] = useState(name ? name : '')
  const [editMode, setEditMode] = useState(false)
  const [errorEmptyField, setErrorEmptyField] = useState(false)
  const [errorStyleButton, setErrorStyleButton] = useState('')

  const handleAnimationEndError = () => setErrorStyleButton('')

  const handleErrorSetNewName = () => {
    if (errorEmptyField) {
      setErrorStyleButton(s.errorButton)
    }
  }

  const handleEditMode = () => {
    setInputValue(cutSpaces(inputValue))
    setEditMode(true)
  }

  const handleSetNewName = (e?: MouseEvent<HTMLDivElement>) => {
    e?.preventDefault()
    if (cutSpaces(inputValue) === '' || inputValue.length > 50) {
      setErrorEmptyField(true)
      setErrorStyleButton(s.errorButton)

      return
    } else {
      setEditMode(false)
    }

    if (cutSpaces(inputValue) !== name) {
      changeName(cutSpaces(inputValue))
    }
  }

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (cutSpaces(e.currentTarget.value) !== '') {
      setErrorEmptyField(false)
    }

    setInputValue(e.currentTarget.value)
  }

  const onBlurInput = () => {
    setInputValue(name ? name : '')
    setEditMode(false)
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
      {editMode ? (
        <div className={s.inputContainer}>
          <CustomInput
            value={inputValue}
            onBlur={onBlurInput}
            onKeyDown={onKeyDownInputHandler}
            onChange={onChangeInputHandler}
            autoFocus={true}
            autoComplete={'new-password'}
            error={errorEmptyField || inputValue.length > 50}
            helperText={inputValue.length > 50 ? 'Name should be less then 50 characters' : ''}
            InputProps={{
              inputProps: { style: { textAlign: 'center' } },
            }}
          />
          <div
            className={`${s.sendButton} ${errorStyleButton}`}
            onMouseDown={handleSetNewName}
            onClick={handleErrorSetNewName}
            onAnimationEnd={handleAnimationEndError}
          />
        </div>
      ) : (
        <>
          <span className={s.userName}>{name}</span>
          <div className={s.marker} onClick={handleEditMode} />
        </>
      )}
    </>
  )
})
