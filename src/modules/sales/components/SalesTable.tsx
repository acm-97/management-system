import React, {memo} from 'react'
import {useSalesSWR} from '../hooks'
import {useProductsForm, useProductsSWR, useProductStore} from '@/hooks'
import {Dialog, SaleInvTable, FormFieldControl, TextField, Button} from '@/components'
import {MinusCircledIcon, PlusCircledIcon} from '@radix-ui/react-icons'
import {useFieldArray, type SubmitHandler} from 'react-hook-form'
import type {ProductsFormProps} from '@/hooks/useProductsForm'
import {SPACES} from '@/constants'

function SalesTable() {
  const {sales} = useSalesSWR()
  const {products, createProduct} = useProductsSWR()
  const isOpen = useProductStore(state => state.isOpen)
  const closeDialog = useProductStore(state => state.closeDialog)
  const setOpen = useProductStore(state => state.setOpen)

  const {
    control,
    handleSubmit,
    formState: {isValid},
    initialSubHeader,
    reset,
  } = useProductsForm()

  const {fields, append, remove, replace} = useFieldArray({
    control,
    name: 'subHeaders',
  })

  const onAddProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleSubmit()
    closeDialog()
  }

  const onAddSubCol = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    append(initialSubHeader)
  }

  const onRemoveSubCol = (e: React.MouseEvent<HTMLButtonElement>, pos: number) => {
    e.preventDefault()
    remove(pos)
  }

  const onCancel = () => {
    closeDialog()
    reset()
    replace([])
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-center text-3xl font-bold">Control de Ventas</h2>
        <Dialog
          open={isOpen}
          onOpenChange={setOpen}
          onSave={onAddProduct}
          onCancel={onCancel}
          trigger={'Producto'}
          startIcon={<PlusCircledIcon className="h-5 w-5" />}
          title="Añadir producto"
          description="Un producto representa una columna la cual puede tener tantas sub-columnas como desee"
        >
          <form className="flex w-full flex-col gap-6" autoComplete="off">
            <div className="flex w-full items-center gap-5">
              <FormFieldControl
                control={control}
                Component={TextField}
                name="name"
                type="text"
                label="Producto"
              />
              <FormFieldControl
                control={control}
                Component={TextField}
                name="color"
                type="color"
                label={'Color'}
              />
            </div>
            <hr className="my-2" />
            {fields.map((item: any, i) => (
              <div key={`${item.name}-${i}`} className="flex w-full items-center gap-5">
                <MinusCircledIcon
                  className="h-8 w-8 text-error-main hover:cursor-pointer"
                  onClick={(e: any) => onRemoveSubCol(e, i)}
                />
                <FormFieldControl
                  control={control}
                  Component={TextField}
                  name={`subHeaders.${i}.name`}
                  type="text"
                  label="Sub-columna"
                />
                <FormFieldControl
                  control={control}
                  Component={TextField}
                  name={`subHeaders.${i}.color`}
                  type="color"
                  label={'Color'}
                />
              </div>
            ))}
            <Button
              className="m-auto"
              variant="text"
              color="primary"
              type="button"
              onClick={onAddSubCol}
            >
              Añadir sub-columna
            </Button>
          </form>
        </Dialog>
      </div>
      <SaleInvTable rows={sales?.data} columns={products?.data} />
    </div>
  )
}

export default memo(SalesTable)
