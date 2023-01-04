import { FC } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import { useAppDispatch } from '../../../../hooks/reduxHooks'
import { updateCardTC, UpdateCardType } from '../../cardsSlice'
import s from '../AddCard/AddCard.module.scss'

type AddCardTextFormType = {
  active: boolean
  closeModal: (state: boolean) => void
  cardsData: UpdateCardType
}

type FormikErrorType = {
  question?: string
  answer?: string
}

export const EditCard: FC<AddCardTextFormType> = ({ active, closeModal, cardsData }) => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      question: cardsData.question,
      answer: cardsData.answer,
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
      const { question, answer } = values

      if (cardsData.question !== question || cardsData.answer !== answer) {
        dispatch(updateCardTC({ id: cardsData.id, question, answer }))
      }
      closeModal(false)
      formik.resetForm()
    },
  })

  console.log('Question: ', formik.values.question)
  const handleCloseModal = () => closeModal(false)

  return (
    <div className={s.AddTextCard}>
      <h3>Edit Card</h3>
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
            Edit
          </Button>
        </div>
      </form>
    </div>
  )
}
