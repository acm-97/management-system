import React, {memo, Fragment} from 'react'
import ColumnMenu from './ColumnMenu'

type SaleInvTableProps = {
  columns: any
  rows: any
}

const Row = ({type, sale}: {type: string; sale: any}) => {
  switch (type) {
    case 'number':
      return sale?.salePrice
    case 'currency':
      return (
        <>
          <span className="text-yellow-300">{sale?.salePrice && '$'} </span>
          {sale?.salePrice}
        </>
      )

    default:
  }
}

function SaleInvTable({columns, rows}: SaleInvTableProps) {
  return (
    <div
      className={
        'overflow-hidden overflow-x-auto rounded-lg border border-slate-700 shadow-sm shadow-white'
      }
    >
      <table cellPadding="0" cellSpacing="0" className={'table w-full'}>
        <thead>
          <tr>
            {columns?.map((col: any) => (
              <th
                className="border border-solid border-slate-700 p-2.5 text-lg font-semibold "
                style={{backgroundColor: col?.color}}
                key={col?.uuid}
                colSpan={col?.subHeaders?.length}
              >
                <span className="flex items-center justify-center gap-4 ">
                  {col?.name}
                  <ColumnMenu column={col} />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {columns?.map(
              (col: any) =>
                col?.subHeaders?.map((subCol: any) => (
                  <th
                    key={subCol?.uuid}
                    className="border border-solid border-slate-700 p-1.5"
                    style={{backgroundColor: subCol?.color}}
                  >
                    {subCol?.name}
                  </th>
                )),
            )}
          </tr>
        </tbody>
        <tbody>
          {rows?.map((row: any) => (
            <tr key={row?.uuid}>
              {columns?.map(
                (col: any) =>
                  col?.subHeaders?.map((subCol: any) => {
                    const sale = row?.info?.find(
                      (item: any) =>
                        item?.product?.id === col?.id && item?.subHeaderId === subCol?.id,
                    )
                    return (
                      <td
                        key={subCol?.uuid}
                        className="border border-solid border-slate-700 p-1 text-center"
                      >
                        <Row type={subCol?.type} sale={sale} />
                      </td>
                    )
                  }),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default memo(SaleInvTable)
