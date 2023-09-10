import React, {memo} from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components'
import {useProductStore, useColumnsSWR} from '@/hooks'
import {IconDotsVertical, IconPencil, IconTrashXFilled} from '@tabler/icons-react'
import {useSalesSWR} from '@/modules/sales/hooks'

type DropdownProps = {column: any}

function ColumnMenu({column}: DropdownProps) {
  const {deleteProduct} = useColumnsSWR()
  const {sales, updateSale} = useSalesSWR()
  const openDialog = useProductStore(state => state.openDialog)
  const setProduct = useProductStore(state => state.setProduct)

  const onEdit = () => {
    setProduct(column)
    openDialog()
  }
  const onDelete = () => {
    sales?.data?.forEach((sale: any) => {
      console.log('🚀 ~ file: ColumnMenu.tsx:28 ~ sales?.data?.forEach ~ sale:', sale)
      const info = sale?.info?.filter(
        (item: any) => !column?.subHeaders?.some((subCol: any) => !!item[subCol?.fieldId]),
      )
      console.log('🚀 ~ file: ColumnMenu.tsx:30 ~ sales?.data?.forEach ~ info:', info)
      if (info.length !== sale?.info?.length) {
        updateSale({id: sale?.id, payload: {info}})
      }
    })
    deleteProduct({id: column?.id})
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
