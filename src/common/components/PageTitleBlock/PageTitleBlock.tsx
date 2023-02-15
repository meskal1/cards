import { FC, memo, useState, useRef, MutableRefObject } from 'react'

import { isMyPack } from '../../../app/selectors'
import { PackActionsMenu } from '../../../features/packs/PackActionsMenu/PackActionsMenu'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useLocationNoUpdates } from '../../../utils/routerUtils'
import { BackToPacks } from '../BackToPacks/BackToPacks'
import { CustomButton } from '../CustomButton/CustomButton'
import { FiltersComponent } from '../FiltersComponent/FiltersComponent'

import s from './PageTitleBlock.module.scss'

type PageTitleBlockType = {
  linkToPacks?: boolean
  hasButtons?: boolean
  title?: string
  buttonClick: () => void
}

export const PageTitleBlock: FC<PageTitleBlockType> = memo(
  ({ linkToPacks = false, hasButtons = true, title = 'Packs list', buttonClick }) => {
    const location = useLocationNoUpdates()
    const packID = location.pathname.split('/cards/')[1]
    const isTableNotEmpty = useAppSelector(state => state.cards.cardsData.cardsTotalCount)
    const isItMyPack = useAppSelector(isMyPack)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const isCards = new RegExp('/cards').test(location.pathname)
    const menuRef = useRef() as MutableRefObject<HTMLDivElement>
    const buttonName = isCards ? `${isItMyPack ? 'Add new card' : 'Learn to pack'}` : 'Add new pack'

    const handleToggleFilter = () => setIsFilterOpen(prevState => !prevState)

    return (
      <div className={s.pageTitleBlockContainer}>
        {linkToPacks && <BackToPacks />}
        <div className={s.pageTitleBlock__content}>
          <div className={s.pageTitleBlock__titleBlock}>
            <h2 className={s.pageTitleBlock__title}>{title}</h2>

            {isItMyPack && (
              <PackActionsMenu
                packID={packID as string}
                packName={title}
                packIsEmpty={!!isTableNotEmpty}
              />
            )}
          </div>

          {hasButtons && (
            <>
              <div className={s.filterButtonContainer}>
                <div ref={menuRef}>
                  {isFilterOpen && (
                    <FiltersComponent
                      parentRef={menuRef}
                      closeMenu={handleToggleFilter}
                      forCards={linkToPacks}
                    />
                  )}
                  <CustomButton className={s.filterButton} onClick={handleToggleFilter}>
                    <p>Add filter</p>
                  </CustomButton>
                </div>
              </div>

              <CustomButton
                className={buttonName === 'Learn to pack' ? s.learnButton : s.addButton}
                onClick={buttonClick}
              >
                <p>{buttonName}</p>
              </CustomButton>
            </>
          )}
        </div>
      </div>
    )
  }
)
