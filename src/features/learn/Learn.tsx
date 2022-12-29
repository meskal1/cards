import React from 'react'

import { Button, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { BackToPacks } from '../../common/components/BackToPacks/BackToPacks'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { ServerCardType } from '../../services/cardsApi'
import { getSearchParams } from '../../utils/getSearchParams'

import s from './Learn.module.scss'
import { getCards, gradeCard } from './LearnSlice'

const initialCard = {
  _id: '',
  cardsPack_id: '',
  user_id: '',
  answer: '',
  question: '',
  grade: 0,
  shots: 0,
  comments: '',
  type: '',
  rating: 0,
  more_id: '',
  created: '',
  updated: '',
  __v: 0,
}

export const Learn = () => {
  const [searchParams] = useSearchParams()
  const allParams = getSearchParams(searchParams)
  const dispatch = useAppDispatch()
  const [card, setCard] = React.useState<ServerCardType>(initialCard)
  const [showAnswer, setShowAnswer] = React.useState(false)
  const cards = useSelector<RootStateType, ServerCardType[]>(state => state.learn.cards)

  console.log('All params: ', allParams)
  console.log('Cards: ', cards)

  const getData = async () => {
    await dispatch(getCards({ cardsPack_id: allParams.cardsPack_id }))
  }

  React.useEffect(() => {
    getData()

    if (allParams.card_id) {
      const selectedCard = cards.find(card => card._id === allParams.card_id)

      console.log('SELECTED ', selectedCard)
      if (selectedCard) setCard(selectedCard)
    }
  }, [])

  console.log('Card question: ', card.question)

  const handleShowAnswer = () => setShowAnswer(!showAnswer)

  const formik = useFormik({
    initialValues: {
      grade: '',
    },
    validate: values => {
      const errors: formikErrorsType = {}

      if (!values.grade) {
        errors.grade = 'rate field is required'
      }
    },
    onSubmit: values => {
      dispatch(gradeCard({ card_id: card._id, grade: +values.grade }))
      console.log(values)
    },
  })

  return (
    <>
      <div className={s.mainContainer}>
        <BackToPacks />
        <div className={s.learnContainer}>
          <p>
            <b>Question:</b> {card.question}
          </p>
          {showAnswer ? (
            <div>
              <p>
                <b>Answer:</b> {card.answer}
              </p>
              <form onSubmit={formik.handleSubmit}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Rate yourself</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    {...formik.getFieldProps('grade')}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Did not know" />
                    <FormControlLabel value="2" control={<Radio />} label="Forgot" />
                    <FormControlLabel value="3" control={<Radio />} label="A lot of thought" />
                    <FormControlLabel value="4" control={<Radio />} label="Confused" />
                    <FormControlLabel value="5" control={<Radio />} label="Knew the answer" />
                  </RadioGroup>
                </FormControl>
                <Button
                  type={'submit'}
                  variant={'contained'}
                  disabled={formik.errors.grade ? true : false}
                >
                  Next
                </Button>
              </form>
            </div>
          ) : (
            <Button type={'button'} variant={'contained'} onClick={handleShowAnswer}>
              Show Answer
            </Button>
          )}
        </div>
      </div>
    </>
  )
}

type formikErrorsType = {
  grade?: string
}
