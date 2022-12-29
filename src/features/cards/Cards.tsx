import * as React from 'react'

import { Navigate, useSearchParams } from 'react-router-dom'

import { CustomButton } from '../../common/components/CustomButton/CustomButton'
import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { CustomModalDialog } from '../../common/components/ModalDialog/CustomModalDialog'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { PATH } from '../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getSearchParams } from '../../utils/getSearchParams'

import { AddCard } from './addCard/AddCard'
import s from './Cards.module.scss'
import {
  AppCardType,
  CardsErrorType,
  clearCardsState,
  updateCardsQueryParamsTC,
} from './cardsSlice'
import { CardsTable } from './CardsTable/CardsTable'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const [searchParams] = useSearchParams()
  const allParams = getSearchParams(searchParams)
  const tableData = useAppSelector<AppCardType[]>(state => state.cards.tableData)
  const packName = useAppSelector(state => state.cards.cardsData.packName)
  const packUserId = useAppSelector(state => state.cards.cardsData.packUserId)
  const myId = useAppSelector(state => state.profile.userData.id)
  const cardsError = useAppSelector<CardsErrorType>(state => state.cards.error)
  const isTableEmpty = !!tableData.length
  const isItMyPack = packUserId === myId

  const [addCard, setAddCard] = React.useState(false)

  const handleTitleButton = React.useCallback(() => {
    setAddCard(true)
  }, [])

  React.useEffect(() => {
    dispatch(updateCardsQueryParamsTC(allParams))

    return () => {
      dispatch(clearCardsState())
    }
  }, [searchParams])

  if (cardsError === 'WRONG_ID') {
    return <Navigate to={PATH.PAGE_NOT_FOUND} replace />
  }

  const { cardsPack_id } = allParams

  return (
    <>
      <div className={s.cardsContainer}>
        <div className={s.cards__controlBlock}>
          <PageTitleBlock
            linkToPacks
            title={packName}
            button={isTableEmpty ? `${isItMyPack ? 'add new card' : 'learn to pack'}` : ''}
            buttonClick={handleTitleButton}
          />
          {isTableEmpty && (
            <div className={s.cards__controlPanel}>
              <CustomSearch cards />
            </div>
          )}
        </div>
        {isTableEmpty ? (
          <>
            <CardsTable isMine={isItMyPack} />
            <CustomPagination cards />
          </>
        ) : (
          <div className={s.cards__emptyBlock}>
            <h3 className={s.cards__emptyTitle}>
              {`this pack is empty. ${isItMyPack ? 'Click add new card to fill this pack' : ''}`}
            </h3>
            {isItMyPack && (
              <CustomButton onClick={handleTitleButton}>
                <p>add new card</p>
              </CustomButton>
            )}
          </div>
        )}
        <CustomModalDialog active={addCard} setActive={setAddCard}>
          <AddCard active={addCard} closeModal={setAddCard} cardsPack_id={cardsPack_id} />
        </CustomModalDialog>
      </div>
    </>
  )
}
