import { KeyboardBackspace } from '@mui/icons-material'
import { Link } from 'react-router-dom'

import { PATH } from '../../../constants/routePaths.enum'

import s from './BackToPacks.module.scss'

export const BackToPacks = () => {
  return (
    <>
      <Link className={s.backToPacks__linkPacks} to={PATH.PACKS}>
        <KeyboardBackspace className={s.backToPacks__arrow} />
        <p>back to packs list</p>
      </Link>
    </>
  )
}
