import React, {memo, useMemo, useState} from 'react'
import ColumnMenu from './ColumnMenu'
import RowField from './RowField'
import {Checkbox} from '../Form'
import type {CheckedState} from '@radix-ui/react-checkbox'
import {cn} from '@/utils'
import {useRowsStore} from '@/hooks'
import Skeleton from './Skeleton'
import {IconTableOff} from '@tabler/icons-react'

type TableProps = {
  columns: Array<Record<string, any>>
  rows: Array<Record<string, any>>
  rowsProps: Record<string, any>
  isLoading: boolean
}

function Table({rows, columns, rowsProps, isLoading}: TableProps) {
  const selectedRows = useRowsStore(state => state.selectedRows)
  const addSelectedRows = useRowsStore(state => state.addSelectedRows)
  const removeSelectedRows = useRowsStore(state => state.removeSelectedRows)
  const selectAllRows = useRowsStore(state => state.selectAllRows)
  const removeAllSelectedRows = useRowsStore(state => state.removeAllSelectedRows)

  const allSelected = useMemo(
    () => rows?.length > 0 && rows?.every(row => selectedRows.includes(row?.rowId)),
    [rows, selectedRows],
  )

  const onCheckedChange = (checked: CheckedState, id: string) => {
    if (checked) {
      addSelectedRows(id)
      return
    }
    removeSelectedRows(id)
  }

  const onCheckedAllChange = (checked: CheckedState) => {
    if (checked) {
      selectAllRows(rows?.map(row => row.rowId))
      return
    }
    removeAllSelectedRows()
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <div
        className={
          'w-full overflow-hidden overflow-x-auto rounded-lg border border-slate-700 shadow-sm shadow-white'
        }
      >
        {isLoading ? (
          <Skeleton />
        ) : columns?.length === 0 ? (
          <div className="flex h-72 flex-col items-center justify-center gap-2">
            <IconTableOff size={80} className="text-slate-500" />
            <p className="uppercase text-slate-500">Cree sus primeros datos</p>
          </div>
        ) : (
          <table cellPadding="0" cellSpacing="0" className={'table w-full'}>
            <thead>
              <tr className="bg-sky-950">
                {columns?.length > 0 && (
                  <th className="border border-solid border-slate-700">
                    <Checkbox
                      className={cn('', {
                        'border-orange-400 text-orange-400': allSelected,
                      })}
                      checked={allSelected}
                      onCheckedChange={onCheckedAllChange}
                    />
                  </th>
                )}
                {columns?.map((col: any) => (
                  <th
                    className="border border-solid border-slate-700 p-3 text-lg font-semibold "
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
            {columns?.some(col => col?.subHeaders?.length > 0) && (
              <tbody>
                <tr className="bg-sky-950">
                  <th className="border border-solid border-slate-700"></th>
                  {columns?.map(
                    (col: any) =>
                      col?.subHeaders?.map((subCol: any) => (
                        <th
                          key={subCol?.fieldId}
                          className="border border-solid border-slate-700 p-2.5"
                          style={{backgroundColor: subCol?.color}}
                        >
                          {subCol?.name}
                        </th>
                      )),
                  )}
                </tr>
              </tbody>
            )}
            <tbody>
              {rows?.map((row, rowIdx) => (
                <tr key={row?.id}>
                  <td className="border border-solid border-slate-700 bg-sky-950 text-center">
                    <Checkbox
                      className={cn('', {
                        'border-orange-400 text-orange-400': selectedRows.includes(row?.rowId),
                      })}
                      checked={selectedRows.includes(row?.rowId)}
                      onCheckedChange={(checked: CheckedState) =>
                        onCheckedChange(checked, row?.rowId)
                      }
                    />
                  </td>
                  {columns?.map((col: any, colIdx: number) => {
                    if (col?.subHeaders?.length > 0) {
                      return col?.subHeaders?.map((subCol: any, subColIdx: number) => (
                        <td
                          key={subCol?.fieldId}
                          className="group border border-solid border-slate-700 p-1 text-center"
                        >
                          <RowField
                            type={subCol?.type}
                            rowsProps={{
                              ...rowsProps,
                              name: `rows.${rowIdx}.info.${colIdx}.${subCol?.fieldId}`,
                              row,
                              dirtyRow: rowIdx,
                            }}
                          />
                        </td>
                      ))
                    }
                    return (
                      <td
                        key={col?.fieldId}
                        className="group border border-solid border-slate-700 p-1 text-center"
                      >
                        <RowField
                          rowsProps={{
                            ...rowsProps,
                            name: `rows.${rowIdx}.info.${colIdx}.${col?.fieldId}`,
                            row,
                            dirtyRow: rowIdx,
                          }}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default memo(Table)
