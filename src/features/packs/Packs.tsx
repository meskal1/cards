import * as React from 'react'

import Button from '@mui/material/Button'
import { useSearchParams } from 'react-router-dom'

import { CustomPagination } from '../../common/components/CustomPagination/CustomPagination'
import { CustomSearch } from '../../common/components/CustomSearch/CustomSearch'
import { PageTitleBlock } from '../../common/components/PageTitleBlock/PageTitleBlock'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { cardsApi } from '../../services/cardsApi'
import { packsApi } from '../../services/packsApi'

import { PackOwnerSwitcher } from './PackOwnerSwitcher/PackOwnerSwitcher'
import s from './Packs.module.scss'
import { PackSlider } from './PackSlider/PackSlider'
import { PacksResetFilter } from './PacksResetFilter/PacksResetFilter'
import { getPacksTC } from './packsSlice'

type PacksType = {}

export const Packs: React.FC<PacksType> = ({}) => {
  const dispatch = useAppDispatch()
  //   const isInitialized = useAppSelector(state => state.app.isInitialized)
  //   const [searchParams, setSearchParams] = useSearchParams()

  const handleTitleButton = () => {
    // dispatch() Add new pack
  }

  React.useEffect(() => {
    dispatch(getPacksTC())
  }, [])

  //TESTS OF API (to be deleted)
  const getLists = () => {
    packsApi.getPacks({ user_id: '6398bbdcad0e4d14d0a550a3', pageCount: 10 }).then(res => {
      console.log(res.data)
    })
  }

  const addPack = () => {
    packsApi.addPack({ name: 'New Pack test', private: false }).then(res => {
      console.log(res.data)
    })
  }

  const deletePack = () => {
    packsApi.deletePack('63a4dea3490bcb44b8bb5187').then(res => {
      console.log(res.data)
    })
  }

  const updatePack = () => {
    packsApi.updatePack({ _id: '63a4ab54490bcb44b8bb5183', name: 'Upated name' })
  }

  //tests for Cards API (to be deleted)

  const getCards = () => {
    cardsApi.getCards({ cardsPack_id: '63a4ab54490bcb44b8bb5183' }).then(res => {
      console.log(res.data)
    })
  }

  const addCard = () => {
    cardsApi
      .addCard({
        cardsPack_id: '63a4ab54490bcb44b8bb5183',
        question: 'test question',
        answer: 'test answer',
      })
      .then(res => {
        console.log(res.data)
      })
  }

  const deleteCard = () => {
    cardsApi.deleteCard('63a4f24b490bcb44b8bb5188').then(res => {
      console.log(res.data)
    })
  }

  const updateCard = () => {
    cardsApi
      .updateCard({ _id: '63a4f2f9490bcb44b8bb5189', question: 'updated question test' })
      .then(res => {
        console.log(res.data)
      })
  }

  return (
    <>
      <div className={s.packsContainer}>
        <div className={s.packs__controlBlock}>
          <PageTitleBlock
            title={'packs list'}
            button={'add new pack'}
            buttonClick={handleTitleButton}
          />
          <div className={s.packs__controlPanel}>
            <CustomSearch />
            <PackOwnerSwitcher />
            <PackSlider />
            <PacksResetFilter />
          </div>
        </div>
        <div className={s.packs__table}>packs table</div>
        <CustomPagination />

        <div id={'TEST-PACKS-API'}>
          <Button variant={'outlined'} onClick={getLists}>
            get All lists
          </Button>
          <Button variant={'outlined'} onClick={addPack}>
            Add Pack
          </Button>
          <Button variant={'outlined'} onClick={deletePack}>
            Delete Pack
          </Button>
          <Button variant={'outlined'} onClick={updatePack}>
            Update Pack
          </Button>
        </div>

        <div id={'TEST-CRDS-API'}>
          <Button variant={'outlined'} onClick={getCards}>
            get All Cards
          </Button>
          <Button variant={'outlined'} onClick={addCard}>
            Add Card
          </Button>
          <Button variant={'outlined'} onClick={deleteCard}>
            Delete Card
          </Button>
          <Button variant={'outlined'} onClick={updateCard}>
            Update Card
          </Button>
        </div>
      </div>
    </>
  )
}
