import {zodResolver} from '@hookform/resolvers/zod'
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

export const RowSchema = z.object({
  rows: z.array(
    z.object({
      info: z.array(z.any()),
    }),
  ),
})

export default function useSalesForm(rows: any) {
  const {handleSubmit, reset, ...rest} = useForm<z.infer<typeof RowSchema>>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(RowSchema),
  })

  useEffect(() => {
    reset({
      rows: rows?.map((row: any) => ({...row, rowId: row.id, info: row?.info ?? []})),
    })
  }, [rows])

  return {
    handleSubmit,
    ...rest,
  }
}
