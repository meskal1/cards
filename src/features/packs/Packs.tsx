import React from 'react'

import { BasicTable } from '../../common/components/Table/Table'
import { packsTable } from '../../constants/tableData'
import { tableHeadCreator } from '../../utils/tableHeadCreator'

type PacksType = {}

export const Packs: React.FC<PacksType> = ({}) => {
  const head = tableHeadCreator(packsTable)

  return (
    <>
      <div>Packs1</div>
      <BasicTable head={head} />
    </>
  )
}
