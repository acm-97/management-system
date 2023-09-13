import React, {memo, useEffect, useCallback} from 'react'
import {useColumnsStore, useColumnsSWR, useRowForm, useRowsStore, useRowsSWR} from '@/hooks'
import {
  AddColumnDialog,
  Button,
  Table,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Pagination,
} from '@/components'
import {useFieldArray} from 'react-hook-form'
import {IconColumns, IconMenu2, IconTableOptions, IconTrashXFilled} from '@tabler/icons-react'
import {buttonVariants} from '@/components/Button'
import {cn} from '@/utils'

function SpaceTable({space}: {space: string}) {
  const {rows, updateRow, createRow, deleteRow, refreshRows, isFetchingRows} = useRowsSWR(space)
  const {control, handleSubmit, ...form} = useRowForm(rows?.data)
  const {columns, isFetchingColumns} = useColumnsSWR(space)
  const openDialog = useColumnsStore(state => state.openDialog)
  const selectedRows = useRowsStore(state => state.selectedRows)

  useEffect(() => {
    if (columns?.data?.length === 0) {
      rows?.data?.forEach(async (row: any) => await deleteRow({id: row?.id}))
    }
  }, [columns?.data?.length])

  const onDeleteRows = () => {
    selectedRows.forEach(async id => await deleteRow({id}))
    refreshRows()
  }

  const {fields} = useFieldArray({
    name: 'rows',
    control,
  })

  const handleKeyPress = useCallback((event: any) => {
    event.preventDefault()
    if (event.ctrlKey === true) {
      if (event.key === 'z') {
        openDialog()
      }
      if (event.key === 'x') {
        createRow({payload: {info: []}})
      }
      if (event.key === 'd') {
        selectedRows.length > 0 && onDeleteRows()
      }
    }
  }, [])

  useEffect(() => {
    // attach the event listener
    window.addEventListener('keydown', handleKeyPress)

    // remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex justify-end ">
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
              <DropdownMenuShortcut>crtl+Z</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => await createRow({payload: {info: []}})}>
              Añadir Filas
              <DropdownMenuShortcut>crtl+X</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDeleteRows} disabled={selectedRows.length === 0}>
              Eliminar Filas
              <DropdownMenuShortcut>crtl+D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AddColumnDialog space={space} />

      <Table
        isLoading={isFetchingRows || isFetchingColumns}
        space={space}
        rows={fields}
        columns={columns?.data}
        rowsProps={{control, handleSubmit, updateRow, form}}
      />
      <Pagination
        page={rows?.meta?.pagination?.page}
        pageSize={rows?.meta?.pagination?.pageSize}
        pageCount={rows?.meta?.pagination?.pageCount}
        total={rows?.meta?.pagination?.total}
      />
    </div>
  )
}

export default memo(SpaceTable)
