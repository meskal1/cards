import {
  FC,
  useState,
  useCallback,
  ChangeEvent,
  MutableRefObject,
  useRef,
  useEffect,
  DragEvent,
  KeyboardEvent,
  memo,
} from 'react'

import { useFormik } from 'formik'
import isBase64 from 'is-base64'

import { CustomInput } from '../../../../common/components/CustomInput/CustomInput'
import { CustomSelect } from '../../../../common/components/CustomSelect/CustomSelect'
import { MainPopup } from '../../../../common/components/Popups/MainPopup/MainPopup'
import { useAppDispatch } from '../../../../hooks/reduxHooks'
import { base64Converter } from '../../../../utils/base64Converter'
import { newCardText, validateImage } from '../../../../utils/validationSchema'
import { addCardTC, updateCardTC, UpdateCardType } from '../../cardsSlice'

import s from './AddEditCard.module.scss'

type AddEditCardType = {
  isOpened: boolean
  onClose: () => void
  cardsPack_id?: string
  cardsData?: UpdateCardType
}

const options = [
  { id: 'text', label: 'Text' },
  { id: 'picture', label: 'Picture' },
]

export const AddEditCard: FC<AddEditCardType> = memo(
  ({ isOpened, onClose, cardsPack_id = '', cardsData }) => {
    const dispatch = useAppDispatch()
    const validImg = isBase64(cardsData?.questionImg || '', { mimeRequired: true })
    const initSelect = validImg ? options[1].id : options[0].id
    const [selectedItem, setSelectedItem] = useState(initSelect)
    const [base64image, setBase64image] = useState(validImg ? cardsData?.questionImg : '')
    const [fileImage, setFileImage] = useState<File | null>(null)
    const [dragOver, setDragOver] = useState(false)
    const isOptionText = selectedItem !== 'text'
    const questionRef = useRef() as MutableRefObject<HTMLInputElement>
    const validateData = {
      size: fileImage?.size || 0,
      type: fileImage?.type || '',
      selectedItem: isOptionText,
      isImageExist: !!base64image,
    }
    const initialValues = {
      questionImg: '',
      question: cardsData?.question || '',
      answer: cardsData?.answer || '',
    }

    const formik = useFormik({
      initialValues,
      validationSchema: newCardText,
      validate: () => validateImage(validateData),
      onSubmit: values => {
        const question = isOptionText ? '' : values.question
        const questionImg = fileImage || base64image ? base64image : ' '
        const answerChanged = values.answer !== initialValues.answer
        const questionChanged = values.question !== initialValues.question

        if (cardsData && (fileImage || answerChanged || questionChanged)) {
          dispatch(updateCardTC({ ...values, id: cardsData?.id || '', questionImg }))
        }

        if (!cardsData) {
          dispatch(addCardTC({ ...values, question, questionImg: base64image, cardsPack_id }))
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

        formik.setFieldValue('question', ' ')
        formik.setTouched({ ...formik.touched, questionImg: true })
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

    const handleSelectedItem = useCallback(
      (item: string) => {
        if (selectedItem !== item) {
          setSelectedItem(item)
          formik.resetForm()
          formik.setValues({ questionImg: '', question: '', answer: '' })
          formik.setFieldError('questionImg', '')
          setBase64image('')
          setFileImage(null)
        }
      },
      [selectedItem]
    )

    useEffect(() => {
      if (!isOptionText) {
        setTimeout(() => questionRef?.current?.focus(), 50)
      }
    }, [])

    return (
      <MainPopup
        title={cardsData ? 'Edit card' : 'Add new card'}
        onOkButtonText={cardsData ? 'Update' : 'Create'}
        onOk={formik.handleSubmit}
        isOpened={isOpened}
        onClose={onClose}
      >
        <div className={s.selectContainer}>
          <p className={s.selectTitle}>Choose a question format</p>
          <CustomSelect
            positionOptions={'left'}
            initValue={selectedItem}
            options={options}
            selectedOption={handleSelectedItem}
          />
        </div>
        <form onSubmit={formik.handleSubmit}>
          {selectedItem === 'text' ? (
            <CustomInput
              inputRef={questionRef}
              label="Question"
              autoComplete="new-password"
              error={formik.touched.question && !!formik.errors.question}
              helperText={formik.touched.question && formik.errors.question}
              onKeyDown={handleFieldKeyDown}
              {...formik.getFieldProps('question')}
            />
          ) : (
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
                error={formik.touched.questionImg && !!formik.errors.questionImg}
                helperText={formik.touched.questionImg && formik.errors.questionImg}
                {...formik.getFieldProps('questionImg')}
                onChange={handleFileUpload}
              />
              {!!base64image && (
                <div className={s.imageContainer}>
                  <img src={base64image} alt="cover" className={s.image} />
                </div>
              )}
            </label>
          )}

          <CustomInput
            label="Answer"
            autoComplete="new-password"
            autoFocus={isOpened}
            error={formik.touched.answer && !!formik.errors.answer}
            helperText={formik.touched.answer && formik.errors.answer}
            onKeyDown={handleFieldKeyDown}
            {...formik.getFieldProps('answer')}
          />
        </form>
      </MainPopup>
    )
  }
)
