import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import {useProductStore} from './useProductStore'
import useProductsSWR from './useProductsSWR'
import {SPACES} from '@/constants'
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
    }),
  ),
})

export type ProductsFormProps = z.infer<typeof FormSchema>

const initialSubHeader = {
  name: '',
  color: '#0f766e',
}

export default function useProductsForm() {
  const {createProduct, updateProduct} = useProductsSWR()
  const product = useProductStore(state => state.product)
  const setProduct = useProductStore(state => state.setProduct)

  const {handleSubmit, reset, ...rest} = useForm<ProductsFormProps>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    resolver: zodResolver(FormSchema),
  })

  useEffect(() => {
    reset({
      name: product?.name ?? '',
      color: product?.color ?? '#134e4a',
      subHeaders: product?.subHeaders ?? [],
    })
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
          space: SPACES.SALES,
          ...(data.subHeaders.length > 0 && {
            subHeaders: data.subHeaders.map((item: any) => ({...item, uuid: crypto.randomUUID()})),
          }),
        },
      })
    }),
    initialSubHeader,
    reset,
    ...rest,
  }
}
