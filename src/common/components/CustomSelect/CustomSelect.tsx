import { FC, useState, memo, MouseEvent, KeyboardEvent, useRef, MutableRefObject } from 'react'

import { useEffectAfterMount } from '../../../hooks/useEffectAfterMount'
import { SelectType } from '../SortTableItems/SortTableItems'

import s from './CustomSelect.module.scss'
import { CustomSelectList } from './CustomSelectList/CustomSelectList'

type CustomSelectType = {
  positionOptions?: 'left' | 'center'
  initValue: string
  reset?: boolean
  options: SelectType<string>[]
  selectedOption: (option: string) => void
}

export const CustomSelect: FC<CustomSelectType> = memo(
  ({ initValue, reset = false, options, selectedOption, positionOptions = 'center' }) => {
    const initSelect = options.filter(el => el.id === initValue)[0].label
    const [selected, setSelected] = useState(initSelect)
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = useRef() as MutableRefObject<HTMLDivElement>

    const handleClickOption = (e: MouseEvent<HTMLLIElement>, id: string) => {
      setSelected(e.currentTarget.textContent!)
      selectedOption(id)
    }

    const handleToggleSelect = () => setIsOpen(!isOpen)

    const handleKeyDownSelectContainer = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
        handleToggleSelect()
      }
    }

    useEffectAfterMount(() => {
      if (reset) {
        setSelected(initSelect)
      }
    }, [reset])

    return (
      <div
        ref={menuRef}
        className={s.select}
        onClick={handleToggleSelect}
        onKeyDown={handleKeyDownSelectContainer}
        tabIndex={2}
      >
        <p className={`${s.selected} ${isOpen ? s.opened : ''}`}>{selected}</p>
        {isOpen && (
          <CustomSelectList
            parentRef={menuRef}
            positionOptions={positionOptions}
            options={options}
            handleClickOption={handleClickOption}
            closeMenu={handleToggleSelect}
          />
        )}
      </div>
    )
  }
)
