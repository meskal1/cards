import * as React from 'react'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch } from '../../hooks/reduxHooks'

import s from './Cards.module.scss'
import { getCardsTC } from './cardsSlice'
import { CardsTable } from './CardsTable/CardsTable'

type CardsType = {}

export const Cards: React.FC<CardsType> = React.memo(({}) => {
  const dispatch = useAppDispatch()

  const handleTitleButton = () => {
    // dispatch() Add new card
  }

  const setQueryParams = () => {}

  React.useEffect(() => {
    dispatch(getCardsTC())
  }, [])

  return (
    <>
      <div className={s.cardsContainer}>
        <div className={s.cards__controlBlock}>
          <PageTitleBlock
            linkToPacks
            title={'packs list'}
            button={'add new pack'}
            buttonClick={handleTitleButton}
          />
          <div className={s.cards__controlPanel}>
            <CustomSearch customSearchParams={setQueryParams} cards />
          </div>
        </div>
        <CardsTable isMine={true} />
        <CustomPagination cards />
      </div>
    </>
  )
})
