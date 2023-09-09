import {useEffect} from 'react'
import {SPACES} from '@/constants'
import {client, errorProps} from '@/utils'
import useSWR from 'swr'
import {toast} from 'react-toastify'
import useSWRMutation from 'swr/mutation'
import {useSalesSWR} from '@/modules/sales/hooks'

export default function useProductsSWR(space: string = SPACES.SALES) {
  const {refreshSales} = useSalesSWR()

  const {
    data: subHeaders,
    isLoading: isFetchingSubHeaders,
    error: subHeadersError,
  } = useSWR('/product-sub-headers', client.get)

  const {
    data: products,
    isLoading: isFetchingProducts,
    error,
    mutate,
  } = useSWR(
    space ? `/products?filters[space][$eq]=${space}&populate[subHeaders][populate]=*` : null,
    client.get,
  )

  useEffect(() => {
    if (error) {
      toast.error(error, errorProps)
    }
    if (subHeadersError) {
      toast.error(subHeadersError, errorProps)
    }
  }, [error, subHeadersError])

  const {trigger: createProduct, isMutating: isCreatingProduct} = useSWRMutation(
    `/products`,
    client.post,
    {
      onSuccess: async () => {
        await mutate()
        refreshSales()
      },
      onError: error => toast.error(error, errorProps),
    },
  )

  const {trigger: updateProduct, isMutating: isUpdatingProduct} = useSWRMutation(
    `/products`,
    client.put,
    {
      onSuccess: async () => {
        await mutate()
        refreshSales()
      },
      onError: error => toast.error(error, errorProps),
    },
  )

  const {trigger: deleteProduct, isMutating: isDeletingProduct} = useSWRMutation(
    `/products`,
    client.delete,
    {
      onSuccess: async () => {
        await mutate()
        refreshSales()
      },
      onError: error => toast.error(error, errorProps),
    },
  )

  return {
    products,
    isFetchingProducts,
    subHeaders,
    isFetchingSubHeaders,
    createProduct,
    isCreatingProduct,
    updateProduct,
    isUpdatingProduct,
    deleteProduct,
    isDeletingProduct,
  }
}
