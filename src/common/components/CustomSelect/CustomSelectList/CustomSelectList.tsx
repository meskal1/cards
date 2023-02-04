import { FC, MouseEvent, MutableRefObject, useRef } from 'react'

import { useOnClickOutside } from '../../../../hooks/useOnClickOutside'
import { SelectType } from '../../SortTableItems/SortTableItems'
import s from '../CustomSelect.module.scss'

type CustomSelectListType = {
  parentRef: MutableRefObject<HTMLDivElement>
  positionOptions?: 'left' | 'center'
  options: SelectType<string>[]
  handleClickOption: (e: MouseEvent<HTMLLIElement>, id: string) => void
  closeMenu: () => void
}

export const CustomSelectList: FC<CustomSelectListType> = ({
  parentRef,
  options,
  closeMenu,
  handleClickOption,
  positionOptions,
}) => {
  const listRef = useRef() as MutableRefObject<HTMLUListElement>

  useOnClickOutside(closeMenu, listRef, parentRef)

  return (
    <ul
      ref={listRef}
      className={positionOptions === 'left' ? s.optionsLeft : s.options}
      onClick={closeMenu}
    >
      {options.map((el, i) => {
        return (
          <li key={i} onMouseDown={e => handleClickOption(e, el.id)} className={s.option}>
            {el.label}
          </li>
        )
      })}
    </ul>
  )
}
