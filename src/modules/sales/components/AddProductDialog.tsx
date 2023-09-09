import {
  Button,
  Dialog,
  FormFieldControl,
  TextField,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components'
import {buttonVariants} from '@/components/Button'
import {useProductStore, useProductsForm, useProductsSWR} from '@/hooks'
import {cn} from '@/utils'
import {MinusCircledIcon, PlusCircledIcon} from '@radix-ui/react-icons'
import {
  IconSquareRoundedPlusFilled,
  IconSquareRoundedMinusFilled,
  Icon123,
  IconCurrencyDollar,
} from '@tabler/icons-react'
import React, {memo} from 'react'
import {useFieldArray} from 'react-hook-form'

// type AddProductDialogProps = {}

const Icon = ({type}: {type: string}) => {
  switch (type) {
    case 'number':
      return <Icon123 size={18} className="text-whi" />
    case 'currency':
      return <IconCurrencyDollar size={16} className="text-whi" />

    default:
      return null
  }
}

function AddProductDialog() {
  const {subHeaders} = useProductsSWR()
  const isOpen = useProductStore(state => state.isOpen)
  const closeDialog = useProductStore(state => state.closeDialog)
  const setOpen = useProductStore(state => state.setOpen)

  const {control, handleSubmit, reset} = useProductsForm()

  const {fields, append, remove, replace} = useFieldArray({
    control,
    name: 'subHeaders',
  })

  const onAddProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleSubmit()
    closeDialog()
  }

  const onAddSubCol = (e: React.MouseEvent<HTMLButtonElement>, data: any) => {
    e.preventDefault()
    append(data)
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
    <Dialog
      open={isOpen}
      onOpenChange={setOpen}
      onSave={onAddProduct}
      onCancel={onCancel}
      trigger={'Producto'}
      startIcon={<IconSquareRoundedPlusFilled size={20} />}
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
        <hr className="my-2 border-slate-600" />
        {fields.map((item: any, i) => (
          <div key={`${item.name}-${i}`} className="flex w-full items-center gap-5">
            <IconSquareRoundedMinusFilled
              size={32}
              className="text-error-main hover:cursor-pointer"
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

        <div className="mt-4 rounded-md bg-slate-800 p-4">
          <h4 className="mb-3.5 text-gray-300">Añadir sub-columns :</h4>
          <div className="flex items-center justify-start gap-3">
            {subHeaders?.data?.map((item: any) => (
              <Button
                className="!py-0.5 px-2 !text-[12px]"
                key={item.uuid}
                onClick={(e: any) =>
                  onAddSubCol(e, {
                    name: item?.name,
                    color: item?.color,
                    type: item?.type,
                  })
                }
                endIcon={
                  <DropdownMenuShortcut>
                    <Icon type={item?.type} />
                  </DropdownMenuShortcut>
                }
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      </form>
    </Dialog>
  )
}

export default memo(AddProductDialog)
