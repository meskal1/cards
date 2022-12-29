import React from 'react'

import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'

import { useAppDispatch } from '../../../hooks/reduxHooks'
import { addCardTC } from '../cardsSlice'

import s from './AddCard.module.scss'

type AddCardType = {
  active: boolean
  closeModal: (state: boolean) => void
  cardsPack_id: string
}

export const AddCard: React.FC<AddCardType> = ({ active, closeModal, cardsPack_id }) => {
  const [cardFormat, setCardFormat] = React.useState('')

  React.useEffect(() => {
    if (!active) {
      setCardFormat('')
    }
  }, [active])

  const handleChange = (event: SelectChangeEvent) => setCardFormat(event.target.value)

  let form

  switch (cardFormat) {
    case 'Text':
      form = <AddCardTextForm closeModal={closeModal} cardsPack_id={cardsPack_id} />
      break
    case 'Picture':
      form = <p>Add picture</p>
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

type AddCardTextFormType = {
  closeModal: (state: boolean) => void
  cardsPack_id: string
}

type FormikErrorType = {
  question?: string
  answer?: string
}

const AddCardTextForm: React.FC<AddCardTextFormType> = ({ closeModal, cardsPack_id }) => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      question: '',
      answer: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.question) {
        errors.question = 'Question is required'
      }
      if (!values.answer) {
        errors.answer = 'Answer is required'
      }

      return errors
    },
    onSubmit: async values => {
      console.log(values)
      const { question, answer } = formik.values

      console.log('submit')
      dispatch(addCardTC({ cardsPack_id, question, answer }))
      closeModal(false)
      formik.resetForm()
    },
  })

  const handleCloseModal = () => closeModal(false)

  return (
    <div className={s.AddTextCard}>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          className={s.FormControl}
          margin="dense"
          size={'small'}
          label={'question'}
          {...formik.getFieldProps('question')}
        />
        {
          <div
            className={
              formik.touched.question && formik.errors.question
                ? `${s.Error} ${s.Error__active}`
                : `${s.Error}`
            }
          >
            {formik.errors.question}
          </div>
        }
        <TextField
          className={s.FormControl}
          margin="dense"
          size={'small'}
          label={'answer'}
          {...formik.getFieldProps('answer')}
        />
        {
          <div
            className={
              formik.touched.answer && formik.errors.answer
                ? `${s.Error} ${s.Error__active}`
                : `${s.Error}`
            }
          >
            {formik.errors.answer}
          </div>
        }
        <div className={s.Submit}>
          <Button variant="outlined" onClick={handleCloseModal} type={'button'}>
            Cancel
          </Button>
          <Button
            type={'submit'}
            variant="contained"
            disabled={!formik.errors.answer && !formik.errors.question ? false : true}
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}
