import {
  FC,
  ChangeEvent,
  useState,
  MutableRefObject,
  useEffect,
  useRef,
  DragEvent,
  KeyboardEvent,
  memo,
} from 'react'

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import Checkbox from '@mui/material/Checkbox'
import { useFormik } from 'formik'
import isBase64 from 'is-base64'

import { CustomInput } from '../../../../common/components/CustomInput/CustomInput'
import { MainPopup } from '../../../../common/components/Popups/MainPopup/MainPopup'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'
import { useAppSelector } from '../../../../hooks/useAppSelector'
import { useEffectAfterMount } from '../../../../hooks/useEffectAfterMount'
import { base64Converter } from '../../../../utils/base64Converter'
import { cutSpaces } from '../../../../utils/cutSpaces'
import { useLocationNoUpdates } from '../../../../utils/routerUtils'
import { newPackText, validateImage } from '../../../../utils/validationSchema'
import { setCardsData } from '../../../cards/cardsSlice'
import { addPackTC, UpdatePackDataType, updatePackTC } from '../../packsSlice'

import s from './AddEditPack.module.scss'

type AddEditPackType = {
  isOpened: boolean
  onClose: () => void
  packData?: UpdatePackDataType
}

export const AddEditPack: FC<AddEditPackType> = memo(({ isOpened, onClose, packData }) => {
  const location = useLocationNoUpdates()
  const isCards = new RegExp('/cards').test(location.pathname)
  const dispatch = useAppDispatch()
  const cardsData = useAppSelector(state => state.cards.cardsData)
  const isItPrivate = isCards ? cardsData.packPrivate : packData?.private
  const validImg = isBase64(packData?.deckCover || '', { mimeRequired: true })
  const [base64image, setBase64image] = useState(validImg ? packData?.deckCover : '')
  const [fileImage, setFileImage] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const nameRef = useRef() as MutableRefObject<HTMLInputElement>
  const validateData = {
    size: fileImage?.size || 0,
    type: fileImage?.type || '',
    isImageExist: !!base64image,
  }
  const initialValues = {
    deckCover: '',
    name: packData?.name || '',
    private: isItPrivate || false,
  }

  const formik = useFormik({
    initialValues,
    validationSchema: newPackText,
    validate: () => validateImage(validateData),
    onSubmit: values => {
      const deckCover = fileImage || base64image ? base64image : ' '
      const nameChanged = values.name !== initialValues.name
      const privateChanged = values.private !== initialValues.private
      const data = { ...cardsData, packPrivate: values.private, packDeckCover: deckCover || '' }

      if (packData && (fileImage || nameChanged || privateChanged || (validImg && !base64image))) {
        if (isCards) {
          dispatch(setCardsData(data))
        }
        dispatch(
          updatePackTC({
            ...values,
            name: cutSpaces(values.name),
            id: packData?.id || '',
            deckCover,
          })
        )
      }

      if (!packData) {
        dispatch(addPackTC({ ...values, name: cutSpaces(values.name), deckCover: base64image }))
      }
      onClose()
    },
  })

  const handleFileUpload = async (e: ChangeEvent<any> | DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    try {
      if ('files' in e.target && e.target.files) {
        setFileImage(e.target.files[0])
      } else if ('dataTransfer' in e) {
        setFileImage(e.dataTransfer.files[0])
      }
      const base64 = (await base64Converter(e)) as string

      formik.setFieldValue('deckCover', ' ')
      formik.setTouched({ ...formik.touched, deckCover: true })
      setBase64image(base64)
    } catch (e) {
      console.log('Error File Upload: ', e)
    }
  }

  const handleLabelDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleFieldKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      formik.handleSubmit()
    }
  }

  const handleRemoveImage = () => {
    setBase64image('')
    setFileImage(null)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      formik.setFieldValue('private', !formik.getFieldProps('private').value)
    }
  }

  useEffect(() => {
    setTimeout(() => nameRef?.current?.focus(), 50)
  }, [])

  return (
    <MainPopup
      title={packData ? 'Edit pack' : 'Add new pack'}
      onOkButtonText={packData ? 'Update' : 'Create'}
      onOk={formik.handleSubmit}
      isOpened={isOpened}
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit}>
        <CustomInput
          inputRef={nameRef}
          label="Name"
          autoComplete="new-password"
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
          onKeyDown={handleFieldKeyDown}
          {...formik.getFieldProps('name')}
        />

        <label
          className={`${s.addImageBlock} ${dragOver ? s.dargOver : ''}`}
          onDragOver={handleLabelDragOver}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleFileUpload}
        >
          <p className={s.addImageBlockTitle}>
            Drag your image here or click to upload.
            <br />
            File size should be less than 100kb
          </p>
          <CustomInput
            type={'file'}
            inputProps={{ accept: '.jpg,.jpeg,.gif,.png,.webp,.svg' }}
            className={s.hidden}
            error={formik.touched.deckCover && !!formik.errors.deckCover}
            helperText={formik.touched.deckCover && formik.errors.deckCover}
            {...formik.getFieldProps('deckCover')}
            value={''}
            onChange={handleFileUpload}
          />
          {!!base64image && (
            <div className={s.imageContainer}>
              <img src={base64image} alt="cover" className={s.image} />
            </div>
          )}
        </label>

        <div className={s.privateAndRemoveContainer}>
          <label className={s.checkbox}>
            <Checkbox
              size="medium"
              onKeyDown={handleKeyDown}
              style={formik.values.private ? { color: '#1B79CE ' } : { color: 'grey ' }}
              checked={formik.values.private}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<TaskAltIcon />}
              {...formik.getFieldProps('private')}
            />
            Private
          </label>

          {base64image && (
            <div className={s.removeImageButton} onClick={handleRemoveImage}>
              Remove
            </div>
          )}
        </div>
      </form>
    </MainPopup>
  )
})
