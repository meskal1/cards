import * as React from 'react'

import { BorderColor, Send } from '@mui/icons-material'

type EditableSpanType = {
  name: string
  changeProfile: (name: string) => void
}

export const EditableSpan: React.FC<EditableSpanType> = ({ name, changeProfile }) => {
  const [title, setName] = React.useState(name)
  const [edit, setEdit] = React.useState(false)

  const changeEditHandler = () => {
    if (edit) {
      //changeProfile()
    }
    setEdit(!edit)
  }

  return (
    <>
      {edit ? <input type="text" name="" id="" /> : <span>{name}</span>}
      <span>
        {edit ? <Send onClick={changeEditHandler} /> : <BorderColor onClick={changeEditHandler} />}
      </span>
    </>
  )
}
