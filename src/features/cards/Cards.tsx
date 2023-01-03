import { useCallback, useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import { CustomButton } from '../../common/components/CustomButton/CustomButton'
import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { LoadingProgress } from '../../common/components/LoadingProgress/LoadingProgress'
import { CustomModalDialog } from '../../common/components/ModalDialog/CustomModalDialog'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { PATH } from '../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useGetSearchParams } from '../../hooks/useGetSearchParams'

import s from './Cards.module.scss'
import {
  AppCardType,
  CardsErrorType,
  clearCardsQueryParams,
  setError,
  updateCardsQueryParamsTC,
  UpdateCardType,
} from './cardsSlice'
import { CardsTable } from './CardsTable/CardsTable'
import { AddCard } from './Modals/AddCard/AddCard'
import { EditCard } from './Modals/EditCard/EditCard'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const allParams = useGetSearchParams()
  const [showChildren, setShowChildren] = useState(false)
  const tableData = useAppSelector<AppCardType[]>(state => state.cards.tableData)
  const cardsPack_id = useAppSelector(state => state.cards.queryParams.cardsPack_id)
  const packName = useAppSelector(state => state.cards.cardsData.packName)
  const packUserId = useAppSelector(state => state.cards.cardsData.packUserId)
  const myId = useAppSelector(state => state.profile.userData.id)
  const cardsError = useAppSelector<CardsErrorType>(state => state.cards.error)
  const isTableNotEmpty = !!tableData.length
  const isItMyPack = packUserId === myId
  const { id } = useParams()
  const navigate = useNavigate()
  const titleButtonName =
    isTableNotEmpty || allParams.cardQuestion
      ? `${isItMyPack ? 'add new card' : 'learn to pack'}`
      : ''

  const [addCard, setAddCard] = useState(false)
  const [editCard, setEditCard] = useState(false)
  const [editData, setEditData] = useState<UpdateCardType>({
    id: '',
    answer: '',
    question: '',
  })

  const handleTitleButton = useCallback(() => {
    setAddCard(true)
  }, [])

  const handleLearnCards = () => {
    navigate(PATH.LEARN + `/${id}`)
  }

  useEffect(() => {
    ;(async () => {
      await dispatch(updateCardsQueryParamsTC({ ...allParams, cardsPack_id: id }))
      setShowChildren(true)
    })()
  }, [id])

  useEffect(() => {
    if (cardsError === 'WRONG_ID') {
      navigate(PATH.PAGE_NOT_FOUND, { replace: true })
      dispatch(setError({ error: null }))
    }
  }, [cardsError])

  useEffect(() => {
    return () => {
      dispatch(clearCardsQueryParams())
    }
  }, [])

  return (
    <>
      {showChildren ? (
        <div className={s.cardsContainer}>
          <div className={s.cards__controlBlock}>
            <PageTitleBlock
              linkToPacks
              title={packName}
              button={titleButtonName}
              buttonClick={isItMyPack ? handleTitleButton : handleLearnCards}
            />
            {(isTableNotEmpty || allParams.cardQuestion) && (
              <div className={s.cards__controlPanel}>
                <CustomSearch cards />
              </div>
            )}
          </div>
          {isTableNotEmpty ? (
            <>
              <CardsTable isMine={isItMyPack} openEdit={setEditCard} setEditData={setEditData} />
              <CustomPagination cards />
            </>
          ) : (
            <div className={s.cards__emptyBlock}>
              <h3 className={s.cards__emptyTitle}>
                {`no cards found. ${isItMyPack ? 'Click add new card to fill this pack' : ''}`}
              </h3>
              {isItMyPack && (
                <CustomButton onClick={handleTitleButton}>
                  <p>add new card</p>
                </CustomButton>
              )}
            </div>
          )}

          {addCard ? (
            <CustomModalDialog active={addCard} setActive={setAddCard}>
              <AddCard active={addCard} closeModal={setAddCard} cardsPack_id={cardsPack_id} />
            </CustomModalDialog>
          ) : (
            ''
          )}

          {editCard ? (
            <CustomModalDialog active={editCard} setActive={setEditCard}>
              <EditCard closeModal={setEditCard} cardsData={editData} active={editCard} />
            </CustomModalDialog>
          ) : (
            ''
          )}
        </div>
      ) : (
        <LoadingProgress />
      )}
    </>
  )
}
