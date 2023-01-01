import { FC } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import { useAppDispatch } from '../../../hooks/reduxHooks'
import { addCardTC } from '../cardsSlice'

import s from './AddCard.module.scss'

type AddCardTextFormType = {
  closeModal: (state: boolean) => void
  cardsPack_id: string
}

type FormikErrorType = {
  question?: string
  answer?: string
}

export const TextForm: FC<AddCardTextFormType> = ({ closeModal, cardsPack_id }) => {
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
