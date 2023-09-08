import React, {memo} from 'react'
import {DotsVerticalIcon, Pencil1Icon, TrashIcon} from '@radix-ui/react-icons'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components'
import {useProductStore, useProductsSWR} from '@/hooks'

type DropdownProps = {column: any}

function ColumnMenu({column}: DropdownProps) {
  const {deleteProduct} = useProductsSWR()
  const openDialog = useProductStore(state => state.openDialog)
  const setProduct = useProductStore(state => state.setProduct)

  const onEdit = () => {
    setProduct(column)
    openDialog()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsVerticalIcon className="h-6 w-6 rounded-full border p-1 hover:cursor-pointer hover:ring-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-transparent bg-primary-dark shadow-sm shadow-white">
        <DropdownMenuItem onClick={onEdit}>
          Editar
          <DropdownMenuShortcut>
            <Pencil1Icon className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={async () => await deleteProduct({id: column?.id})}>
          Eliminar
          <DropdownMenuShortcut>
            <TrashIcon className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default memo(ColumnMenu)
