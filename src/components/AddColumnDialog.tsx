import {Button, Dialog, FormFieldControl, TextField} from '@/components'
import type {SPACES} from '@/constants'
import {useColumnsStore, useColumnsForm, useColumnsSWR} from '@/hooks'
import {
  IconCalendarEvent,
  IconSquareRoundedMinusFilled,
  Icon123,
  IconCurrencyDollar,
} from '@tabler/icons-react'
import React, {memo} from 'react'
import {useFieldArray} from 'react-hook-form'

type AddColumnDialogProps = {space: SPACES}

const Icon = ({type}: {type: string}) => {
  switch (type) {
    case 'date':
      return <IconCalendarEvent size={14} />
    case 'number':
      return <Icon123 size={18} />
    case 'totalNumber':
      return <Icon123 size={18} />
    case 'currency':
      return <IconCurrencyDollar size={14} />
    case 'totalCurrency':
      return <IconCurrencyDollar size={14} />
    default:
      return null
  }
}

function AddColumnDialog({space}: AddColumnDialogProps) {
  const {subHeaders} = useColumnsSWR(space)
  const isOpen = useColumnsStore(state => state.isOpen)
  const closeDialog = useColumnsStore(state => state.closeDialog)
  const setOpen = useColumnsStore(state => state.setOpen)

  const {
    control,
    handleSubmit,
    formState: {isValid},
    reset,
  } = useColumnsForm(space)

  const {fields, append, remove, replace} = useFieldArray({
    control,
    name: 'subHeaders',
  })

  const onAddColumn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    handleSubmit()
    isValid && closeDialog()
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
      onSave={onAddColumn}
      onCancel={onCancel}
      // trigger="Añadir column"
      title="Añadir column"
      description="Un column representa una columna la cual puede tener tantas sub-columnas como desee"
      variant="text"
      // className="text-sm font-normal capitalize text-gray-300"
    >
      <form className="flex w-full flex-col gap-6" autoComplete="off">
        <div className="flex w-full items-center gap-5">
          <FormFieldControl
            control={control}
            Component={TextField}
            name="name"
            type="text"
            label="Column"
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
          <div className="flex flex-wrap items-center justify-start gap-3">
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
                endIcon={<Icon type={item?.type} />}
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

export default memo(AddColumnDialog)
