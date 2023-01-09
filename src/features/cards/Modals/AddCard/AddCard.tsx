import { FC, useEffect, useState } from 'react'

import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'

import s from './AddCard.module.scss'
import { PictureForm } from './PictureForm'
import { TextForm } from './TextForm'

type AddCardType = {
  active: boolean
  closeModal: (state: boolean) => void
  cardsPack_id: string
}

export const AddCard: FC<AddCardType> = ({ active, closeModal, cardsPack_id }) => {
  const [cardFormat, setCardFormat] = useState('')

  useEffect(() => {
    if (!active) {
      setCardFormat('')
    }
  }, [active])

  const handleChange = (event: SelectChangeEvent) => setCardFormat(event.target.value)

  let form

  switch (cardFormat) {
    case 'Text':
      form = <TextForm closeModal={closeModal} cardsPack_id={cardsPack_id} />
      break
    case 'Picture':
      form = <PictureForm closeModal={closeModal} cardsPack_id={cardsPack_id} />
      break
    default:
      form = ''
      break
  }

  return (
    <div className={s.CardContainer}>
      <div className={s.CardTypeContainer}>
        <p className={s.CardTypeContainer__title}>Choose a question format</p>
        <div className={s.Type}>
          <FormControl fullWidth>
            <Select
              size={'small'}
              id="demo-simple-select"
              value={cardFormat}
              onChange={handleChange}
            >
              <MenuItem value={'Text'}>Text</MenuItem>
              <MenuItem value={'Picture'}>Picture</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>{form}</div>
    </div>
  )
}
