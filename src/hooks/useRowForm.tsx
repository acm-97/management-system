import type {RowData} from '@/types'
import {zodResolver} from '@hookform/resolvers/zod'
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

export const RowSchema = z.object({
  rows: z.array(
    z.object({
      info: z.array(z.any()),
      rowId: z.number(),
    }),
  ),
})

export default function useSalesForm(rows: RowData[]) {
  const {handleSubmit, reset, ...rest} = useForm<z.infer<typeof RowSchema>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(RowSchema),
  })

  useEffect(() => {
    reset({
      rows: rows?.map(row => ({rowId: row.id, info: row?.info ?? []})),
    })
  }, [rows])

  return {
    handleSubmit,
    ...rest,
  }
}
