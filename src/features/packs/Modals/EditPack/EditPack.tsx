import { ChangeEvent, FC, useState } from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'

import cover from '../../../../assets/img/cover.png'
import cs from '../../../../common/styles/modalStyles/ModalStyles.module.scss'
import { useAppDispatch } from '../../../../hooks/reduxHooks'
import { updatePackTC } from '../../packsSlice'

import s from './EditPack.module.scss'

type EditPackType = {
  activeModal: (state: boolean) => void
  data: {
    id: string
    name: string
    deckCover: string
  }
}

type formikErrorType = {
  name?: string
}

export const EditPack: React.FC<EditPackType> = ({ data, activeModal }) => {
  const dispatch = useAppDispatch()
  const [errors, setErrors] = useState<formikErrorType>({ name: '' })
  const [image, setImage] = useState(data.deckCover)

  const formik = useFormik({
    initialValues: {
      name: data.name,
    },
    validate: values => {
      if (!values.name) {
        setErrors({ name: 'name is required' })
      } else if (values.name.length > 50) {
        setErrors({ name: 'name should be less then 50 characters' })
      } else {
        setErrors({ name: '' })
      }
    },
    onSubmit: values => {
      if (data.name !== values.name || data.deckCover !== image) {
        dispatch(updatePackTC({ id: data.id, name: formik.values.name, deckCover: image }))
      }
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
        <div className={s.PackDataBlock}>
          <h3 className={s.Title}>Edit Pack</h3>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            size={'small'}
            {...formik.getFieldProps('name')}
          />
          {
            <div
              className={
                formik.touched.name && errors.name ? `${s.Error} ${s.Error__active}` : `${s.Error}`
              }
            >
              {errors.name}
            </div>
          }

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
              Add Pack Cover
            </Button>
          </label>
        </div>
        <div className={s.Submit}>
          <Button onClick={() => activeModal(false)} type={'button'} variant="outlined">
            Cancel
          </Button>
          <Button disabled={errors.name ? true : false} type={'submit'} variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}
