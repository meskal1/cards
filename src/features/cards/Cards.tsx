import { useCallback, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { cardsTableLength, isMyPack } from '../../app/selectors'
import cover from '../../assets/img/cover.png'
import { CustomButton } from '../../common/components/CustomButton/CustomButton'
import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { CustomModalDialog } from '../../common/components/ModalDialog/CustomModalDialog'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import cs from '../../common/styles/modalStyles/ModalStyles.module.scss'
import { PATH } from '../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getQueryParams } from '../../utils/getQueryParams'
import { useNavigateNoUpdates } from '../../utils/routerUtils'

import s from './Cards.module.scss'
import {
  CardsErrorType,
  clearCardsQueryParams,
  setCardsQueryParams,
  setError,
  UpdateCardType,
} from './cardsSlice'
import { CardsTable } from './CardsTable/CardsTable'
import { AddCard } from './Modals/AddCard/AddCard'
import { DeleteCard } from './Modals/DeleteCard/DeleteCard'
import { EditCard } from './Modals/EditCard/EditCard'

export const Cards = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const allParams = getQueryParams()
  const isTableNotEmpty = useAppSelector(cardsTableLength)
  const isItMyPack = useAppSelector(isMyPack)
  const packName = useAppSelector(state => state.cards.cardsData.packName)
  const packDeckCover = useAppSelector<string | null>(state => state.cards.cardsData.packDeckCover)
  const cardsError = useAppSelector<CardsErrorType>(state => state.cards.error)
  const navigate = useNavigateNoUpdates()
  const titleButtonName =
    isTableNotEmpty || allParams.cardQuestion
      ? `${isItMyPack ? 'add new card' : 'learn to pack'}`
      : ''

  const [addCard, setAddCard] = useState(false)
  const [deleteCard, setDeleteCard] = useState(false)
  const [deleteData, setDeleteData] = useState('')
  const [editCard, setEditCard] = useState(false)
  const [editData, setEditData] = useState<UpdateCardType>({
    id: '',
    answer: '',
    question: '',
    questionImg: '',
  })

  const handleTitleButton = useCallback(() => setAddCard(true), [])

  const handleLearnCards = () => navigate(PATH.LEARN + `/${id}`)

  useEffect(() => {
    if (cardsError === 'WRONG_ID') {
      navigate(PATH.PAGE_NOT_FOUND, { replace: true })
      dispatch(setError({ error: null }))
    }
  }, [cardsError])

  useEffect(() => {
    dispatch(setCardsQueryParams({ ...allParams, cardsPack_id: id }))

    return () => {
      dispatch(clearCardsQueryParams())
    }
  }, [])

  return (
    <div className={s.cardsContainer}>
      <div className={s.cards__controlBlock}>
        <PageTitleBlock
          linkToPacks
          title={packName}
          packDeckCover={packDeckCover}
          button={titleButtonName}
          buttonClick={isItMyPack ? handleTitleButton : handleLearnCards}
        />
        <div className={`${cs.ImageContainer} ${s.ImageContainer}`}>
          <img
            src={packDeckCover ? packDeckCover : ''}
            alt="cover"
            className={cs.Image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null // prevents looping
              currentTarget.src = cover
            }}
          />
        </div>
        {(isTableNotEmpty || allParams.cardQuestion) && (
          <div className={s.cards__controlPanel}>
            <CustomSearch cards />
          </div>
        )}
      </div>
      {isTableNotEmpty ? (
        <>
          <CardsTable
            isMine={isItMyPack}
            openEdit={setEditCard}
            setEditData={setEditData}
            setDeleteData={setDeleteData}
            openDelete={setDeleteCard}
          />
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
          <AddCard active={addCard} closeModal={setAddCard} cardsPack_id={id ? id : ''} />
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

      {deleteCard ? (
        <CustomModalDialog active={deleteCard} setActive={setDeleteCard}>
          <DeleteCard activeModal={setDeleteCard} id={deleteData} />
        </CustomModalDialog>
      ) : (
        ''
      )}
    </div>
  )
}
