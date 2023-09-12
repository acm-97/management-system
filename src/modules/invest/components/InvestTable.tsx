import React, {memo, useEffect} from 'react'
import {useColumnsStore, useColumnsSWR, useRowForm, useRowsStore} from '@/hooks'
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
import {useInvestsSWR} from '../hooks'
import {IconColumns, IconMenu2, IconTableOptions, IconTrashXFilled} from '@tabler/icons-react'
import {buttonVariants} from '@/components/Button'
import {cn} from '@/utils'
import {SPACES} from '@/constants'

function InvestTable() {
  const {invests, updateInvest, createInvest, deleteInvest, refreshInvests, isFetchingInvests} =
    useInvestsSWR()
  const {control, handleSubmit, ...form} = useRowForm(invests?.data)
  const {columns, isFetchingColumns} = useColumnsSWR(SPACES.INVEST)
  const openDialog = useColumnsStore(state => state.openDialog)
  const selectedRows = useRowsStore(state => state.selectedRows)

  useEffect(() => {
    if (columns?.data?.length === 0) {
      invests?.data?.forEach(async (invest: any) => await deleteInvest({id: invest?.id}))
    }
  }, [columns?.data?.length])

  const onDeleteInvests = () => {
    selectedRows.forEach(async id => await deleteInvest({id}))
    refreshInvests()
  }

  const {fields} = useFieldArray({
    name: 'rows',
    control,
  })

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
              <DropdownMenuShortcut>
                <IconColumns className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => await createInvest({payload: {info: []}})}>
              Añadir Filas
              <DropdownMenuShortcut>
                <IconMenu2 className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDeleteInvests} disabled={selectedRows.length === 0}>
              Eliminar Filas
              <DropdownMenuShortcut>
                <IconTrashXFilled className="h-4 w-4" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <AddColumnDialog space={SPACES.INVEST} />

      <Table
        isLoading={isFetchingInvests || isFetchingColumns}
        space={SPACES.INVEST}
        rows={fields}
        columns={columns?.data}
        rowsProps={{control, handleSubmit, updateRow: updateInvest, form}}
      />
      <Pagination
        page={invests?.meta?.pagination?.page}
        pageSize={invests?.meta?.pagination?.pageSize}
        total={invests?.meta?.pagination?.total}
      />
    </div>
  )
}

export default memo(InvestTable)
