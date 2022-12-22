import React from 'react'

import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'

type EditPackType = {
  data: {
    id: string
    name: string
  }
}

export const EditPack: React.FC<EditPackType> = ({ data }) => {
  const [isDisabled, setIsDisabled] = React.useState(false)

  type ErrorType = {
    name?: string
  }
  const formik = useFormik({
    initialValues: {
      name: data.name,
    },
    validate: values => {
      const errors: ErrorType = {}

      if (!values.name) {
        errors.name = 'name is required'
        setIsDisabled(true)
      } else if (values.name.length > 50) {
        errors.name = 'name should be less then 50 characters'
        setIsDisabled(true)
      }

      return errors
    },
    onSubmit: values => {
      console.log(values)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3>Edit Pack</h3>
      <p>{data.id}</p>
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        size={'small'}
        {...formik.getFieldProps('name')}
      />
      {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}
      <Button type={'submit'} variant="contained" disabled={isDisabled}>
        Submit
      </Button>
    </form>
  )
}
