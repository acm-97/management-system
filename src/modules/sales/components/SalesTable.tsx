import React, {memo, useEffect} from 'react'
import {useColumnsStore, useColumnsSWR, useRowForm, useRowsStore} from '@/hooks'
import {
  AddColumnDialog,
  Button,
  SaleInvTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components'
import {useFieldArray} from 'react-hook-form'
import {useSalesSWR} from '../hooks'
import {IconColumns, IconMenu2, IconTableOptions, IconTrashXFilled} from '@tabler/icons-react'
import {buttonVariants} from '@/components/Button'
import {cn} from '@/utils'

function SalesTable() {
  const {sales, updateSale, createSale, deleteSale, refreshSales, isFetchingSales} = useSalesSWR()
  const {control, handleSubmit, formState} = useRowForm(sales?.data)
  const {products, isFetchingProducts} = useColumnsSWR()
  const openDialog = useColumnsStore(state => state.openDialog)
  const selectedRows = useRowsStore(state => state.selectedRows)

  useEffect(() => {
    if (products?.data?.length === 0) {
      sales?.data?.forEach(async (sale: any) => await deleteSale({id: sale?.id}))
    }
  }, [products?.data?.length])

  const onDeleteSales = () => {
    selectedRows.forEach(async id => await deleteSale({id}))
    refreshSales()
  }

  const {fields} = useFieldArray({
    name: 'rows',
    control,
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-center text-3xl font-bold">Control de Ventas</h2>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <span className={cn(buttonVariants(), 'flex gap-2')}>
                <IconTableOptions className="h-6 w-6 rounded-full border p-1 hover:cursor-pointer hover:ring-2" />
                Acciones
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-transparent bg-primary-dark shadow-sm shadow-white">
              <DropdownMenuItem onClick={openDialog}>
                Añadir Columnas
                <DropdownMenuShortcut>
                  <IconColumns className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={async () => await createSale({payload: {info: []}})}>
                Añadir Filas
                <DropdownMenuShortcut>
                  <IconMenu2 className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDeleteSales} disabled={selectedRows.length === 0}>
                Eliminar Filas
                <DropdownMenuShortcut>
                  <IconTrashXFilled className="h-4 w-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AddColumnDialog />

      <SaleInvTable
        isLoading={isFetchingSales || isFetchingProducts}
        rows={fields}
        columns={products?.data}
        rowsProps={{control, handleSubmit, isDirty: formState.isDirty, updateRow: updateSale}}
      />
    </div>
  )
}

export default memo(SalesTable)
