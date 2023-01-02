import { useState } from 'react'

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
  const [isDisabled, setIsDisabled] = React.useState(true)
  const [errors, setErrors] = React.useState<FormikErrorType>({ name: '' })

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
      await dispatch(addPackTC({ ...formik.values }))
      activeModal(false)
      formik.resetForm()
    },
  })

  return (
    <div className={s.Container}>
      <form onSubmit={formik.handleSubmit}>
        <h3 className={s.Title}>Add Pack</h3>
        <TextField margin="dense" {...formik.getFieldProps('name')} size={'small'} label={'name'} />
        {
          <div
            className={
              formik.touched.name && errors.name ? `${s.Error} ${s.Error__active}` : `${s.Error}`
            }
          >
            {errors.name}
          </div>
        }
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
