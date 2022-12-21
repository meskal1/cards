import React, { useEffect, useState } from 'react'

import { Search } from '@mui/icons-material'
import { Box, InputAdornment, Slider, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'

import { RootStateType } from '../../app/store'
import { FormDialog } from '../../common/components/ModalDialog/ModalDialog'
import { BasicTable } from '../../common/components/Table/Table'
import { packsTable } from '../../constants/tableData'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { Pack } from '../../services/packsApi'
import { cretePacksTableBody, tableHeadCreator } from '../../utils/tableHeadCreator'

import s from './Packs.module.scss'
// eslint-disable-next-line import/namespace
import { getAllPacks } from './packsReducer'

type PacksType = {}

export type dialogModeType = 'edit' | 'add' | ''

export const Packs: React.FC<PacksType> = ({}) => {
  //control Panel state
  const [open, setOpen] = React.useState(true)
  const [packId, setPackId] = React.useState('')
  const [packs, setPacks] = React.useState('all')
  const [dialogMode, setDialogMode] = React.useState<dialogModeType>('add')

  // open close Modal callbacks
  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  //change dialogMode callback
  const handleDialogMode = (mode: dialogModeType) => setDialogMode(mode)

  // packId to appear at Modal dialog
  const selectPackId = (id: string) => setPackId(id)

  // cardPacks from state
  const cardPacks = useSelector<RootStateType, Array<Pack>>(state => state.packs.cardPacks)

  //take data about card for Modal Dialog
  const data = cardPacks.find(pack => pack._id === packId)
  const modalData = data ? { id: data._id, name: data.name } : { id: null, name: null }

  //personal id for requesting my packs
  const my_id = useSelector<RootStateType, string>(state => state.profile.userData.id)

  const dispatch = useAppDispatch()

  //head for basic table
  const head = tableHeadCreator(packsTable)

  //rows of packs into basic table
  const rows = cretePacksTableBody(cardPacks, open, openModal, closeModal, selectPackId)

  //all & my packs handlers
  const handleAllPacks = () => {
    dispatch(getAllPacks())
    setPacks('all')
  }

  //double range slider
  function valuetext(value: number) {
    return `${value}°C`
  }

  const [cardsAmount, setCardsAmount] = React.useState<number[]>([0, 37])

  const handleChange = (event: Event, newValue: number | number[]) => {
    setCardsAmount(newValue as number[])
  }

  const handleAddPack = () => {
    handleDialogMode('add')
    openModal()
  }

  useEffect(() => {
    dispatch(getAllPacks())
  }, [])

  return (
    <>
      <div className={s.Head}>
        <h1>Packs List</h1>
        <Button
          variant="contained"
          size={'small'}
          style={{ borderRadius: '20px' }}
          onClick={handleAddPack}
        >
          Add new Pack
        </Button>
      </div>
      <div className={s.ControlPanel}>
        <div>
          <h3>Search</h3>
          <TextField
            size={'small'}
            className={s.Search}
            id="outlined-basic"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </div>
        <div>
          <h3>Show packs cards</h3>
          <Button variant={packs === 'all' ? 'contained' : 'outlined'} size={'small'}>
            All
          </Button>
          <Button variant={packs === 'my' ? 'contained' : 'outlined'} size={'small'}>
            My
          </Button>
        </div>
        <div>
          <h3>Number of cards</h3>
          <div className={s.SliderContainer}>
            <div className={s.CardsNumber}>{cardsAmount[0]}</div>
            <Box sx={{ width: 120 }} className={s.Slider}>
              <Slider
                getAriaLabel={() => 'Temperature range'}
                value={cardsAmount}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                size={'small'}
              />
            </Box>
            <div className={s.CardsNumber}>{cardsAmount[1]}</div>
          </div>
        </div>
      </div>
      <BasicTable head={head} rows={rows} />
      <FormDialog
        key={packId}
        data={modalData}
        opened={open}
        closeModal={closeModal}
        dialogMode={dialogMode}
      />
      <div className={s.Pagination}></div>
    </>
  )
}
