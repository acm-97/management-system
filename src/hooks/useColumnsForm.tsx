import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useColumnsStore} from './useColumnsStore'
import useColumnsSWR from './useColumnsSWR'
import {type SPACES} from '@/constants'
import {useEffect} from 'react'

const FormSchema = z.object({
  name: z.string().min(1, {
    message: 'Un nombre para el columno es requerido.',
  }),
  color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  subHeaders: z.array(
    z.object({
      name: z.string().min(1, {
        message: 'Un nombre para la sub-columna es requerido.',
      }),
      color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
      type: z.string(),
    }),
  ),
})

export type ColumnsFormProps = z.infer<typeof FormSchema>

export default function useColumnsForm(space: SPACES) {
  const {createColumn, updateColumn} = useColumnsSWR(space)
  const column = useColumnsStore(state => state.column)
  const setColumn = useColumnsStore(state => state.setColumn)

  const {handleSubmit, reset, ...rest} = useForm<ColumnsFormProps>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(FormSchema),
  })

  const initialForm = {
    name: column?.name ?? '',
    color: column?.color ?? '#134e4a',
    subHeaders: column?.subHeaders ?? [],
  }

  useEffect(() => {
    reset(initialForm)
  }, [column])

  return {
    handleSubmit: handleSubmit(data => {
      if (column) {
        updateColumn({id: column.id, payload: data})
        setColumn(null)
        return
      }

      createColumn({
        payload: {
          ...data,
          space,
          fieldId: `${data?.name?.replace?.(' ', '_').toLowerCase()}-${crypto.randomUUID()}`,
          ...(data.subHeaders.length > 0 && {
            subHeaders: data.subHeaders.map((item: any) => ({
              ...item,
              fieldId: `${item?.type}_${crypto.randomUUID().replace?.('-', '_')}`,
            })),
          }),
        },
      })
      reset(initialForm)
    }),
    reset,
    ...rest,
  }
}
