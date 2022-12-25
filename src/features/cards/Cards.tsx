import * as React from 'react'

import { Navigate, useSearchParams } from 'react-router-dom'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { PATH } from '../../constants/routePaths.enum'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { CardType } from '../../services/cardsApi'
import { getSearchParams } from '../../utils/getSearchParams'

import s from './Cards.module.scss'
import { CardsErrorType, clearCardsState, updateCardsQueryParamsTC } from './cardsSlice'
import { CardsTable } from './CardsTable/CardsTable'

type CardsType = {}

export const Cards: React.FC<CardsType> = React.memo(({}) => {
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const allParams = getSearchParams(searchParams)
  const tableData = useAppSelector<CardType[]>(state => state.cards.tableData)
  const cardsError = useAppSelector<CardsErrorType>(state => state.cards.error)

  const handleTitleButton = () => {
    // dispatch() Add new card
  }

  React.useEffect(() => {
    dispatch(updateCardsQueryParamsTC({ ...allParams }))

    return () => {
      dispatch(clearCardsState())
    }
  }, [])

  if (cardsError === 'WRONG_ID') {
    return <Navigate to={PATH.PAGE_NOT_FOUND} replace />
  }

  return (
    <>
      <div className={s.cardsContainer}>
        <div className={s.cards__controlBlock}>
          <PageTitleBlock
            linkToPacks
            title={'cards list'}
            button={'add new pack'}
            buttonClick={handleTitleButton}
          />
          <div className={s.cards__controlPanel}>
            <CustomSearch cards />
          </div>
        </div>
        {tableData.length ? (
          <CardsTable isMine={true} />
        ) : (
          <h1 style={{ fontSize: '64px' }}>Cards not found</h1>
        )}
        <CustomPagination cards />
      </div>
    </>
  )
})
