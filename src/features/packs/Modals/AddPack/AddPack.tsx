import { ChangeEvent, useState } from 'react'

import { FormControlLabel } from '@mui/material'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'

import { useAppDispatch } from '../../../../hooks/reduxHooks'
import { addPackTC } from '../../packsSlice'

import s from './AddPack.module.scss'

type AddPackType = {
  activeModal: (state: boolean) => void
}

type FormikErrorType = {
  name?: string
}

export const AddPack: React.FC<AddPackType> = ({ activeModal }) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [errors, setErrors] = useState<FormikErrorType>({ name: '' })
  const [image, setImage] = useState('')

  const dispatch = useAppDispatch()

  const formik = useFormik({
    initialValues: {
      name: '',
      private: false,
    },
    validate: values => {
      const errors: FormikErrorType = {}

      setErrors({})
      if (!values.name) {
        setErrors({ name: 'Required' })
        setIsDisabled(true)
      } else if (values.name.length > 50) {
        setErrors({ name: 'Name should be less then 50 characters' })
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }

      return errors
    },
    onSubmit: async values => {
      await dispatch(addPackTC({ ...values, deckCover: image ? image : '' }))
      activeModal(false)
      formik.resetForm()
    },
  })

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
    <div className={s.Container}>
      <form onSubmit={formik.handleSubmit}>
        <h3 className={s.Title}>Add Pack</h3>
        <div className={s.FormFields}>
          <TextField
            margin="dense"
            {...formik.getFieldProps('name')}
            size={'small'}
            label={'name'}
          />
        </div>
        {
          <div
            className={
              formik.touched.name && errors.name ? `${s.Error} ${s.Error__active}` : `${s.Error}`
            }
          >
            {errors.name}
          </div>
        }
        {image ? (
          <div className={s.ImageContainer}>
            <img src={image} alt="cover" className={s.Image} />
          </div>
        ) : (
          ''
        )}
        <label>
          <input type="file" hidden onChange={handleCoverInput} accept={'image/*'} />
          <Button variant={'contained'} className={s.FormFields} component={'span'}>
            Add Pack Cover
          </Button>
        </label>
        <div>
          <FormControlLabel
            control={
              <Checkbox checked={formik.values.private} {...formik.getFieldProps('private')} />
            }
            label="Private"
          />
        </div>
        <div className={s.Submit}>
          <Button onClick={() => activeModal(false)} type={'button'} variant="outlined">
            Cancel
          </Button>
          <Button type={'submit'} variant="contained" disabled={isDisabled}>
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}
