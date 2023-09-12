import React, {memo, type ReactNode} from 'react'
import {DatePickerField, FormFieldControl, TextField} from '../Form'
import AutowidthInput from 'react-autowidth-input'
import type {SubmitHandler} from 'react-hook-form'
import {type RowSchema} from '@/hooks/useRowForm'
import {cn, getNumbers, getCurrency} from '@/utils'
import {columnTypes} from '@/constants'

const Input = ({
  children,
  helperText,
  error,
  handleSubmit,
  row,
  updateRow,
  dirtyRow,
  columnType,
  form,
  ...props
}: any) => {
  const {
    formState: {isDirty},
  } = form

  const onBlur: SubmitHandler<typeof RowSchema> = data => {
    if (isDirty) {
      updateRow({id: row.rowId, payload: data?.rows?.[dirtyRow]})
    }
  }

  return (
    <div className="flex min-w-[50px] items-center justify-center gap-3 ">
      {children}
      <AutowidthInput
        {...props}
        className={cn(
          'w-auto rounded-md border border-transparent bg-transparent group-hover:border-slate-600 pl-1',
          {'border-error-light': error},
          {'px-2': props.type === 'text'},
        )}
        minWidth={16}
        extraWidth={props?.type !== 'number' ? 0 : 16}
        onBlur={handleSubmit(onBlur)}
        autoComplete="off"
      />
    </div>
  )
}

const DateInput = ({
  helperText,
  error,
  handleSubmit,
  row,
  value,
  onChange,
  updateRow,
  dirtyRow,
  form,
  ...props
}: any) => {
  const onSelect: SubmitHandler<typeof RowSchema> = (data, date: any) => {
    onChange(date)
    updateRow({id: row.rowId, payload: data?.rows?.[dirtyRow]})
  }

  return (
    <div className=" flex justify-center">
      <DatePickerField {...props} selected={new Date(value)} onSelect={handleSubmit(onSelect)} />
    </div>
  )
}

type RowFieldProps = {type?: string; rowsProps: any}

function RowField({type, rowsProps}: RowFieldProps) {
  switch (type) {
    case columnTypes.NUMBER:
      return <FormFieldControl Component={Input} type="number" columnType={type} {...rowsProps} />

    case columnTypes.CURRENCY:
      return (
        <FormFieldControl
          Component={(props: any) => (
            <Input {...props}>
              <span className="text-yellow-300"> $ </span>
            </Input>
          )}
          type="number"
          columnType={type}
          {...rowsProps}
        />
      )

    case columnTypes.DATE:
      return <FormFieldControl Component={DateInput} type="date" {...rowsProps} />

    case columnTypes.TOTALNUNMER: {
      return <span>{getNumbers(rowsProps.row.info, columnTypes.NUMBER)}</span>
    }

    case columnTypes.TOTALCURRENCY: {
      return <span>{getCurrency(rowsProps.row.info, columnTypes.CURRENCY)}</span>
    }

    default:
      return <FormFieldControl Component={Input} type="text" {...rowsProps} />
  }
}

export default memo(RowField)
