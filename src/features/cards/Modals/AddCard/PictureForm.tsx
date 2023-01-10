import { ChangeEvent, FC, useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import cs from '../../../../common/styles/modalStyles/ModalStyles.module.scss'
import { useAppDispatch } from '../../../../hooks/reduxHooks'
import { addCardTC } from '../../cardsSlice'

import s from './AddCard.module.scss'

type AddCardPictureFormType = {
  closeModal: (state: boolean) => void
  cardsPack_id: string
}

type FormikErrorType = {
  question?: string
  answer?: string
}

export const PictureForm: FC<AddCardPictureFormType> = ({ closeModal, cardsPack_id }) => {
  const dispatch = useAppDispatch()
  const [image, setImage] = useState('')

  const formik = useFormik({
    initialValues: {
      question: image,
      answer: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!image) {
        errors.question = 'Question is required'
      }
      if (!values.answer) {
        errors.answer = 'Answer is required'
      }

      return errors
    },
    onSubmit: async values => {
      console.log(values)
      const { answer } = formik.values

      console.log('submit')
      dispatch(addCardTC({ cardsPack_id, question: ' ', questionImg: image, answer }))
      closeModal(false)
      formik.resetForm()
    },
  })

  console.log(formik.values)

  const handleCloseModal = () => closeModal(false)

  //to be refactored as util function
  const handleCoverInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000 && file.type.includes('image')) {
        const reader = new FileReader()

        reader.onload = () => {
          const file64 = reader.result as string

          setImage(file64)
        }

        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div className={s.AddTextCard}>
      <form onSubmit={formik.handleSubmit}>
        {image ? (
          <div className={cs.ImageContainer}>
            <img src={image} alt="cover" className={cs.Image} />
          </div>
        ) : (
          ''
        )}
        <label>
          <input type="file" hidden onChange={handleCoverInput} accept={'image/*'} />
          <Button variant={'contained'} className={cs.FormFields} component={'span'}>
            Add Question Picture
          </Button>
        </label>
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
