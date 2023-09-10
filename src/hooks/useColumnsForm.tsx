import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useColumnsStore} from './useColumnsStore'
import useColumnsSWR from './useColumnsSWR'
import {type SPACES} from '@/constants'
import {useEffect} from 'react'

const FormSchema = z.object({
  name: z.string().min(1, {
    message: 'Un nombre para el producto es requerido.',
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

export type ProductsFormProps = z.infer<typeof FormSchema>

export default function useProductsForm(space: SPACES) {
  const {createProduct, updateProduct} = useColumnsSWR()
  const product = useColumnsStore(state => state.product)
  const setProduct = useColumnsStore(state => state.setProduct)

  const {handleSubmit, reset, ...rest} = useForm<ProductsFormProps>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(FormSchema),
  })

  const initialForm = {
    name: product?.name ?? '',
    color: product?.color ?? '#134e4a',
    subHeaders: product?.subHeaders ?? [],
  }

  useEffect(() => {
    reset(initialForm)
  }, [product])

  return {
    handleSubmit: handleSubmit(data => {
      if (product) {
        updateProduct({id: product.id, payload: data})
        setProduct(null)
        return
      }

      createProduct({
        payload: {
          ...data,
          space,
          fieldId: `${data?.name?.replace?.(' ', '_').toLowerCase()}-${crypto.randomUUID()}`,
          ...(data.subHeaders.length > 0 && {
            subHeaders: data.subHeaders.map((item: any) => ({
              ...item,
              fieldId: `${item?.name?.replace?.(' ', '_').toLowerCase()}-${crypto.randomUUID()}`,
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
