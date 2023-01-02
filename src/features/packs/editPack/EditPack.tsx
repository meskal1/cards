import * as React from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'

import { useAppDispatch } from '../../../hooks/reduxHooks'
import { updatePackTC } from '../packsSlice'

import s from './EditPack.module.scss'

type EditPackType = {
  activeModal: (state: boolean) => void
  data: {
    id: string
    name: string
  }
}

type formikErrorType = {
  name?: string
}

export const EditPack: React.FC<EditPackType> = ({ data, activeModal }) => {
  const dispatch = useAppDispatch()
  const [errors, setErrors] = React.useState<formikErrorType>({ name: '' })

  console.log(data.name)

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
      if (data.name !== values.name) {
        dispatch(updatePackTC({ id: data.id, name: formik.values.name }))
      }
      activeModal(false)
      formik.resetForm()
    },
  })

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
