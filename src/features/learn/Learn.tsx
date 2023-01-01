import { useEffect, useState } from 'react'

import { Button, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { useLocation } from 'react-router-dom'

import { RootStateType } from '../../app/store'
import { BackToPacks } from '../../common/components/BackToPacks/BackToPacks'
import { PATH } from '../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useGetSearchParams } from '../../hooks/useGetSearchParams'
import { ServerCardType } from '../../services/cardsApi'
import { getCard } from '../../utils/random'

import s from './Learn.module.scss'
import { getCards, gradeCard } from './learnSlice'

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

  console.log('PakId: ', packId)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const appStatus = useAppSelector(state => state.app.status)

  console.log('Location', location)
  const [card, setCard] = useState<ServerCardType>(initialCard)
  const [showAnswer, setShowAnswer] = useState(false)
  const cards = useSelector<RootStateType, ServerCardType[]>(state => state.learn.cards)
  const [cardId, setCardId] = useState(location.state ? location.state.cardId : '')

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      if (packId) {
        await dispatch(getCards({ cardsPack_id: packId }))
      }
    })()
  }, [])

  useEffect(() => {
    let selectedCard: any

    if (cardId) {
      for (let i = 0; i < cards.length; i++) {
        if (cards[i]._id === cardId) {
          selectedCard = cards[i]
        }
      }
      if (selectedCard) {
        setCard(selectedCard)
        setCardId('')
      }
    } else {
      if (cards.length === 0 && appStatus !== 'loading') {
        alert('No cards left!')
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
            {showAnswer ? (
              <div>
                <p>
                  <b>Answer:</b> {card && card.answer}
                </p>
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
      )}
    </>
  )
}

type formikErrorsType = {
  grade?: string
}
