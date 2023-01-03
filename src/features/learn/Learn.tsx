import { useEffect, useState } from 'react'

import { Button, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useLocation } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { BackToPacks } from '../../common/components/BackToPacks/BackToPacks'
import { CustomModalDialog } from '../../common/components/ModalDialog/CustomModalDialog'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { ServerCardType } from '../../services/cardsApi'
import { getCard } from '../../utils/random'

import s from './Learn.module.scss'
import { getCards, gradeCard } from './learnSlice'
import { NoCardsToLearn } from './Modals/NoCardsToLearn'

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

const grades = [
  { grade: '1', title: 'Did not know' },
  { grade: '2', title: 'Forgot' },
  { grade: '3', title: 'A lot of thought' },
  { grade: '4', title: 'Confused' },
  { grade: '5', title: 'Knew the answer' },
]

export const Learn = () => {
  let { packId } = useParams()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.status)

  console.log('Location', location)
  const [card, setCard] = useState<ServerCardType>(initialCard)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const cards = useSelector<RootStateType, ServerCardType[]>(state => state.learn.cards)
  const [cardId, setCardId] = useState(location.state ? location.state.cardId : '')

  console.log('Cards: ', cards)

  const getData = async () => {
    if (packId) {
      await dispatch(getCards({ cardsPack_id: packId }))
    }
    console.log('First useEffect')

    return
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    let selectedCard

    if (cardId) {
      for (let i = 0; i < cards.length; i++) {
        if (cards[i]._id === cardId) {
          selectedCard = cards[i]
        }
      }

      console.log('SELECTED ', selectedCard)
      if (selectedCard) {
        setCard(selectedCard)
        setCardId('')
      }
    } else {
      if (cards.length === 0 && appStatus !== 'loading') {
        setShowAlert(true)
      } else {
        const newCard = getCard(cards)

        setCard(newCard)
      }
    }
  }, [cards])

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
      handleShowAnswer()
      dispatch(gradeCard({ card_id: card._id, grade: +values.grade }))
    },
  })

  return (
    <>
      {appStatus === 'loading' ? (
        ''
      ) : (
        <div className={s.mainContainer}>
          <BackToPacks />
          <div className={s.learnContainer}>
            <p>
              <b>Question:</b> {card && card.question}
            </p>
            <br />
            <p> Number of attempts: {card ? card.shots : ''}</p>
            <br />
            {showAnswer ? (
              <div>
                <p>
                  <b>Answer:</b> {card && card.answer}
                </p>
                <br />
                <form onSubmit={formik.handleSubmit}>
                  <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Rate yourself</FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      {...formik.getFieldProps('grade')}
                    >
                      {grades.map(grade => {
                        return (
                          <FormControlLabel
                            key={grade.grade}
                            value={grade.grade}
                            control={<Radio />}
                            label={grade.title}
                          />
                        )
                      })}
                    </RadioGroup>
                  </FormControl>
                  <div className={s.ButtonContainer}>
                    <Button type={'submit'} variant={'contained'} disabled={!!formik.errors.grade}>
                      Next
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className={s.ButtonContainer}>
                <Button type={'button'} variant={'contained'} onClick={handleShowAnswer}>
                  Show Answer
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {showAlert ? (
        <CustomModalDialog active={showAlert}>
          <NoCardsToLearn />
        </CustomModalDialog>
      ) : (
        ''
      )}
    </>
  )
}

type formikErrorsType = {
  grade?: string
}
