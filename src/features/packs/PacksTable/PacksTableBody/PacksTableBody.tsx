import { FC } from 'react'

import dayjs from 'dayjs'
import isBase64 from 'is-base64'
import { Link } from 'react-router-dom'

import { RequestStatusType } from '../../../../app/appSlice'
import { TableHeadType } from '../../../../common/components/CustomTableHead/CustomTableHead'
import { PATH } from '../../../../constants/routePaths.enum'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import { useNavigateNoUpdates } from '../../../../utils/routerUtils'
import { PackActionsMenu } from '../../PackActionsMenu/PackActionsMenu'
import { AppPackType } from '../../packsSlice'
import { PacksOrderByType } from '../PacksTable'

import s from './PacksTableBody.module.scss'

type PacksTableBodyType = {
  heads: TableHeadType<PacksOrderByType>[]
}

export const PacksTableBody: FC<PacksTableBodyType> = ({ heads }) => {
  const tableData = useAppSelector<AppPackType[]>(state => state.packs.tableData)
  const userId = useAppSelector(state => state.profile.userData.id)
  const navigate = useNavigateNoUpdates()

  const handleOpenCardPack = (id: string, requestStatus: RequestStatusType) => {
    if (requestStatus === 'loading') return
    navigate(PATH.CARDS + `/${id}`)
  }

  return (
    <tbody className={s.tablePacks__body}>
      {tableData.map(row => {
        return (
          <tr key={row._id} className={s.tablePacks__bodyRow}>
            {heads.map((h, i) => {
              const validImg = isBase64(row.deckCover, { mimeRequired: true })

              return (
                <td
                  className={s.tablePacks__bodyCell}
                  scope="row"
                  key={h.id}
                  onClick={() => handleOpenCardPack(row._id, row.requestStatus)}
                >
                  <div className={s.tablePacks__bodyCellContent}>
                    <div className={s.tablePacks__bodyCellTitle}>
                      {i === 0 ? row[h.id] : h.label}
                    </div>

                    {h.id === 'name' && validImg && (
                      <div className={s.packImageWrapper}>
                        <img src={row.deckCover} alt="deckCover" className={s.packImage} />
                      </div>
                    )}

                    <p
                      className={`${s.packNameAdaptive} ${
                        h.id === 'name' && validImg ? s.packName : ''
                      }`}
                    >
                      {h.id === 'updated' ? dayjs(row[h.id]).format('DD.MM.YYYY') : row[h.id]}
                    </p>
                  </div>
                </td>
              )
            })}
            <td className={s.tablePacks__bodyCell}>
              {userId === row.more_id ? (
                <PackActionsMenu
                  deckCover={row.deckCover}
                  isPrivate={row.private}
                  packID={row._id as string}
                  packName={row.name}
                  openToLeft
                  packIsEmpty={!!row.cardsCount}
                />
              ) : (
                <Link
                  className={row.cardsCount === 0 ? s.linkToLearnDisabled : s.linkToLearnActive}
                  to={PATH.LEARN + `/${row._id}`}
                />
              )}
            </td>
          </tr>
        )
      })}
    </tbody>
  )
}
