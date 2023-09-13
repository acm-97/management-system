import React, {memo} from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components'
import {useColumnsStore, useColumnsSWR, useRowsSWR} from '@/hooks'
import {IconDotsVertical, IconPencil, IconTrashXFilled} from '@tabler/icons-react'

type DropdownProps = {column: any; space: string}

function ColumnMenu({column, space}: DropdownProps) {
  const {deleteColumn} = useColumnsSWR(space)
  const {rows, updateRow} = useRowsSWR(space)
  const openDialog = useColumnsStore(state => state.openDialog)
  const setColumn = useColumnsStore(state => state.setColumn)

  const onEdit = () => {
    setColumn(column)
    openDialog()
  }
  const onDelete = () => {
    let info: any[] | null = null
    rows?.data?.forEach((row: any) => {
      if (column?.subHeaders?.length > 0) {
        info = row?.info?.filter(
          (item: any) => !column?.subHeaders?.some((subCol: any) => !!item[subCol?.fieldId]),
        )
      } else {
        info = row?.info?.filter((item: any) => !item[column?.fieldId])
      }

      if (info && info.length !== row?.info?.length) {
        updateRow({id: row?.id, payload: {info}})
      }
    })
    deleteColumn({id: column?.id})
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconDotsVertical className="h-6 w-6 rounded-full border p-1 hover:cursor-pointer hover:ring-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-transparent bg-primary-dark shadow-sm shadow-white">
        <DropdownMenuItem onClick={onEdit}>
          Editar
          <DropdownMenuShortcut>
            <IconPencil className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDelete}>
          Eliminar
          <DropdownMenuShortcut>
            <IconTrashXFilled className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default memo(ColumnMenu)
