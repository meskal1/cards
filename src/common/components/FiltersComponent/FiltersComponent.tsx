import { FC, MutableRefObject, useRef } from 'react'

import { RequestStatusType } from '../../../app/appSlice'
import { PackOwnerSwitcher } from '../../../features/packs/PackOwnerSwitcher/PackOwnerSwitcher'
import { PackSlider } from '../../../features/packs/PackSlider/PackSlider'
import { PacksResetFilter } from '../../../features/packs/PacksResetFilter/PacksResetFilter'
import { useAppSelector } from '../../../hooks/reduxHooks'
import { useEscapeKey } from '../../../hooks/useEscapeKey'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { LoadingProgress } from '../LoadingProgress/LoadingProgress'
import { SortTableItems } from '../SortTableItems/SortTableItems'

import s from './FiltersComponent.module.scss'

type FiltersComponentType = {
  parentRef: MutableRefObject<HTMLDivElement>
  forCards?: boolean
  closeMenu: () => void
}

export const FiltersComponent: FC<FiltersComponentType> = ({
  parentRef,
  forCards = false,
  closeMenu,
}) => {
  const packStatus = useAppSelector<RequestStatusType>(state => state.packs.status)
  const cardStatus = useAppSelector<RequestStatusType>(state => state.cards.status)
  const status = packStatus === 'loading' || cardStatus === 'loading'
  const filtersRef = useRef() as MutableRefObject<HTMLDivElement>

  useOnClickOutside(closeMenu, filtersRef, parentRef)
  useEscapeKey(closeMenu)

  return (
    <div ref={filtersRef} className={s.filtersConainer}>
      {status && (
        <div className={s.overlay}>
          <LoadingProgress />
        </div>
      )}

      {forCards ? (
        <SortTableItems forCards />
      ) : (
        <>
          <SortTableItems />
          <PackSlider />
          <div className={s.switcherContainer}>
            <PackOwnerSwitcher />
            <PacksResetFilter />
          </div>
        </>
      )}
    </div>
  )
}
