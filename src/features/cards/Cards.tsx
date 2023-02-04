import { useCallback, useEffect, useRef, useState } from 'react'

import isBase64 from 'is-base64'
import { useParams } from 'react-router-dom'

import { isMyPack } from '../../app/selectors'
import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { LoadingProgress } from '../../common/components/LoadingProgress/LoadingProgress'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { PATH } from '../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getQueryParams } from '../../utils/getQueryParams'
import { useNavigateNoUpdates } from '../../utils/routerUtils'

import s from './Cards.module.scss'
import { CardsErrorType, clearCardsState, setCardsQueryParams, setError } from './cardsSlice'
import { CardsTable } from './CardsTable/CardsTable'
import { AddEditCard } from './Modals/AddEditCard/AddEditCard'

export const Cards = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const allParams = getQueryParams()
  const isTableNotEmpty = useAppSelector(state => state.cards.cardsData.cardsTotalCount)
  const isItMyPack = useAppSelector(isMyPack)
  const packName = useAppSelector(state => state.cards.cardsData.packName)
  const packDeckCover = useAppSelector(state => state.cards.cardsData.packDeckCover)
  const cardsError = useAppSelector<CardsErrorType>(state => state.cards.error)
  const navigate = useNavigateNoUpdates()
  const [openModal, setOpenModal] = useState(false)
  const validImg = isBase64(packDeckCover, { mimeRequired: true })
  const cardQuestion = allParams.cardQuestion ? 1 : 0
  const showElement = useRef(isTableNotEmpty || cardQuestion || 0) // Spike fix for wrong cardsTotalCount coming from backend

  if (isTableNotEmpty && !showElement.current) {
    showElement.current++
  }

  const handleToggleModal = useCallback(() => setOpenModal(!openModal), [openModal])

  const handleLearnCards = useCallback(() => navigate(PATH.LEARN + `/${id}`), [])

  useEffect(() => {
    if (cardsError === 'WRONG_ID') {
      navigate(PATH.PAGE_NOT_FOUND, { replace: true })
      dispatch(setError({ error: null }))
    }
  }, [cardsError])

  useEffect(() => {
    dispatch(setCardsQueryParams({ ...allParams, cardsPack_id: id }))

    return () => {
      dispatch(clearCardsState())
    }
  }, [])

  return (
    <>
      {packName ? (
        <div className={s.cardsContainer}>
          <div className={s.cards__controlBlock}>
            <PageTitleBlock
              linkToPacks
              title={packName}
              hasButtons={!!showElement.current}
              buttonClick={isItMyPack ? handleToggleModal : handleLearnCards}
            />

            {validImg && (
              <div className={s.imgContainer}>
                <img src={packDeckCover} alt="cover" className={s.img} />
              </div>
            )}

            {!!showElement.current && <CustomSearch forCards />}
          </div>

          <CardsTable
            isMine={isItMyPack}
            showButton={!!showElement.current}
            handleTitleButton={handleToggleModal}
          />
          <CustomPagination forCards />

          {openModal && (
            <AddEditCard isOpened={openModal} onClose={handleToggleModal} cardsPack_id={id || ''} />
          )}
        </div>
      ) : (
        <LoadingProgress />
      )}
    </>
  )
}
