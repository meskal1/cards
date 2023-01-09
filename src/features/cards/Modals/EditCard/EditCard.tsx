import { ChangeEvent, FC, useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import cover from '../../../../assets/img/cover.png'
import cs from '../../../../common/styles/modalStyles/ModalStyles.module.scss'
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
  const [image, setImage] = useState(cardsData.questionImg)

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

      if (
        cardsData.question !== question ||
        cardsData.answer !== answer ||
        cardsData.questionImg !== image
      ) {
        debugger
        console.log('Check: ', cardsData.questionImg === image)
        await dispatch(updateCardTC({ id: cardsData.id, question, answer, questionImg: image }))
      }
      closeModal(false)
      formik.resetForm()
    },
  })

  const handleCloseModal = () => closeModal(false)

  //to be refactored as util function
  const handleCoverInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000 && file.type.includes('image')) {
        const reader = new FileReader()

        reader.onload = async () => {
          const file64 = reader.result as string

          await setImage(file64)
        }

        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div className={s.AddTextCard}>
      <h3>Edit Card</h3>
      <form onSubmit={formik.handleSubmit}>
        {image ? (
          <>
            <div className={cs.ImageContainer}>
              <img
                src={image}
                alt="cover"
                className={cs.Image}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null // prevents looping
                  currentTarget.src = cover
                }}
              />
            </div>

            <label>
              <input type="file" hidden onChange={handleCoverInput} accept={'image/*'} />
              <Button variant={'contained'} className={cs.FormFields} component={'span'}>
                Upload Question Picture
              </Button>
            </label>
          </>
        ) : (
          <>
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
          </>
        )}

        {/*<TextField
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
        }*/}
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
