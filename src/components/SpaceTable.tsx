import React, {memo, useEffect, useCallback} from 'react'
import {useColumnsStore, useColumnsSWR, useRowForm, useRowsStore, useRowsSWR} from '@/hooks'
import {
  AddColumnDialog,
  Table,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Pagination,
} from '@/components'
import {useFieldArray} from 'react-hook-form'
import {IconTableOptions} from '@tabler/icons-react'
import {buttonVariants} from '@/components/Button'
import {cn} from '@/utils'
import useSpacesSWR from '@/hooks/useSpaceSWR'

function SpaceTable({space, spaceId}: {space: string; spaceId: number}) {
  const {rows, updateRow, createRow, deleteRow, refreshRows, isFetchingRows} = useRowsSWR(space)
  const {control, handleSubmit, ...form} = useRowForm(rows?.data ?? [])
  const {columns, isFetchingColumns, deleteColumn} = useColumnsSWR(space)
  const {deleteSpace} = useSpacesSWR()
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

  const onDeleteSpace = () => {
    deleteSpace({id: spaceId})
    rows?.data?.forEach(async (row: any) => {
      if (row.space === space) {
        await deleteRow({id: row?.id})
      }
    })
    columns?.data?.forEach(async col => {
      if (col.space === space) {
        await deleteColumn({id: col?.id})
      }
    })

    window.location.href = '/'
  }

  const {fields} = useFieldArray({
    name: 'rows',
    control,
  })

  const handleKeyPress = useCallback(
    (event: any) => {
      if (event.ctrlKey === true) {
        event.preventDefault()
        if (event.key === 'z') {
          openDialog()
        }
        if (event.key === 'x') {
          event.preventDefault()
          createRow({payload: {space, info: []}})
        }
        if (event.key === 'd') {
          event.preventDefault()
          selectedRows.length > 0 && onDeleteRows()
        }
      }
    },
    [selectedRows],
  )

  useEffect(() => {
    // attach the event listener
    window.addEventListener('keydown', handleKeyPress)

    // remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return (
    <div className="flex w-full flex-col gap-6 pt-4">
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
            <DropdownMenuItem onClick={async () => await createRow({payload: {space, info: []}})}>
              Añadir Filas
              <DropdownMenuShortcut>crtl+X</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDeleteRows} disabled={selectedRows.length === 0}>
              Eliminar Filas
              <DropdownMenuShortcut>crtl+D</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDeleteSpace}>Eliminar Espacio</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AddColumnDialog space={space} />

      <Table
        isLoading={isFetchingRows || isFetchingColumns}
        space={space}
        rows={fields}
        columns={columns?.data ?? []}
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
