import { useEffect, useState } from 'react'

import { Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { useFormik } from 'formik'
import isBase64 from 'is-base64'
import { useParams } from 'react-router'

import { BackToPacks } from '../../common/components/BackToPacks/BackToPacks'
import { CustomButton } from '../../common/components/CustomButton/CustomButton'
import { LoadingProgress } from '../../common/components/LoadingProgress/LoadingProgress'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useEffectAfterMount } from '../../hooks/useEffectAfterMount'
import { ServerCardType } from '../../services/cardsApi'
import { cutSpaces } from '../../utils/cutSpaces'
import { useLocationNoUpdates } from '../../utils/routerUtils'
import { getCard } from '../../utils/showCardsSmartRandom'

import s from './Learn.module.scss'
import { getCards, gradeCard, setInitialized } from './learnSlice'
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
  answerImg: '',
  answerVideo: '',
  questionImg: '',
  questionVideo: '',
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
  const location = useLocationNoUpdates()
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(state => state.learn.isInitialized)
  const [card, setCard] = useState<ServerCardType>(initialCard)
  const [showAnswer, setShowAnswer] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const cards = useAppSelector<ServerCardType[]>(state => state.learn.cardsData.cards)
  const packName = useAppSelector(state => state.learn.cardsData.packName)
  const [cardId, setCardId] = useState(location.state?.cardId || '')
  const validImg = isBase64(card.questionImg, { mimeRequired: true })

  const formik = useFormik({
    initialValues: {
      grade: '',
    },
    onSubmit: values => {
      handleShowAnswer()
      dispatch(gradeCard({ card_id: card._id, grade: +values.grade }))
      formik.resetForm()
    },
  })

  const handleShowAnswer = () => setShowAnswer(prevState => !prevState)

  const handleSubmit = () => formik.handleSubmit()

  useEffectAfterMount(() => {
    if (cardId) {
      const selectedCard = cards.filter((el, i) => cards[i]._id === cardId)[0]

      if (selectedCard) {
        setCard(selectedCard)
        setCardId('')
      }
    } else {
      if (!cards.length && isInitialized) {
        setOpenModal(true)
      } else {
        setCard(getCard(cards))
      }
    }
  }, [cards])

  useEffect(() => {
    if (!packId) return
    dispatch(getCards(packId))

    return () => {
      dispatch(setInitialized(false))
    }
  }, [])

  return (
    <>
      {isInitialized ? (
        <div className={s.learnContainer}>
          <BackToPacks />
          <h2 className={s.learnTitle}>{cutSpaces(packName)}</h2>
          <div className={s.learnContent}>
            <div className={s.questionContainer}>
              <span className={s.text}>
                <span className={s.boldText}>Question:</span> {!validImg && card.question}
              </span>

              {validImg && (
                <div className={s.imgContainer}>
                  <img src={card.questionImg} alt="cover" className={s.img} />
                </div>
              )}
            </div>

            {showAnswer && (
              <div className={s.answerContainer}>
                <span className={s.text}>
                  <span className={s.boldText}>Answer:</span> {card?.answer}
                </span>

                <form className={s.radioButtonsBlock} onSubmit={formik.handleSubmit}>
                  <span className={s.rateText}>Rate yourself</span>
                  <RadioGroup {...formik.getFieldProps('grade')}>
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
                </form>
              </div>
            )}
            <CustomButton
              type={'submit'}
              className={s.button}
              onClick={showAnswer ? handleSubmit : handleShowAnswer}
              disabled={!formik.values.grade && showAnswer}
            >
              {showAnswer ? 'Next card' : 'Show answer'}
            </CustomButton>

            <span className={s.textAttempts}>Attempts: {card.shots}</span>
          </div>

          {openModal && <NoCardsToLearn />}
        </div>
      ) : (
        <LoadingProgress />
      )}
    </>
  )
}
