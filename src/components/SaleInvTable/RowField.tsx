import React, {memo, type ReactNode} from 'react'
import {FormFieldControl, TextField} from '../Form'
import AutowidthInput from 'react-autowidth-input'
import type {SubmitHandler} from 'react-hook-form'
import {type RowSchema} from '@/hooks/useRowForm'
import {cn} from '@/utils'

const Input = ({
  children,
  helperText,
  error,
  handleSubmit,
  isDirty,
  row,
  updateRow,
  dirtyRow,
  ...props
}: any) => {
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
          'w-auto rounded-md border border-transparent bg-transparent group-hover:border-slate-600',
          {'border-error-light': error},
        )}
        minWidth={16}
        extraWidth={props?.type !== 'number' ? 0 : 16}
        onBlur={handleSubmit(onBlur)}
        autoComplete="off"
      />
    </div>
  )
}
const component = (type: string | undefined, rowsProps: any) => {
  switch (type) {
    case 'number':
      return {
        ...rowsProps,
        Component: Input,
        type: 'number',
      }
    case 'currency':
      return {
        ...rowsProps,
        Component: (props: any) => (
          <Input {...props}>
            <span className="text-yellow-300">{props?.value && '$'} </span>{' '}
          </Input>
        ),
        type: 'number',
      }
    default:
      return {
        ...rowsProps,
        Component: Input,
        type: 'text',
      }
  }
}

type RowFieldProps = {type?: string; rowsProps: any}

function RowField({type, rowsProps}: RowFieldProps) {
  return <FormFieldControl {...component(type, rowsProps)} />
}

export default memo(RowField)
