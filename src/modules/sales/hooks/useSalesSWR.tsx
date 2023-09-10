import {swrConfig} from '@/constants'
import {client, errorProps} from '@/utils'
import {toast} from 'react-toastify'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export default function useInvestSWR() {
  const {
    data: sales,
    isLoading: isFetchingSales,
    mutate: refreshSales,
  } = useSWR('/sales?populate[info][populate]=*&sort=createdAt:desc', client.get, swrConfig)

  const {trigger: createSale, isMutating: isCreatingSale} = useSWRMutation('/sales', client.post, {
    onSuccess: async () => await refreshSales(),
    onError: error => toast.error(error, errorProps),
  })

  const {trigger: updateSale, isMutating: isUpdatingSale} = useSWRMutation('/sales', client.put, {
    // onSuccess: async () => await refreshSales(),
    onError: error => toast.error(error, errorProps),
  })

  const {trigger: deleteSale, isMutating: isDeletingSale} = useSWRMutation(
    '/sales',
    client.delete,
    {
      onSuccess: async () => await refreshSales(),
      onError: error => toast.error(error, errorProps),
    },
  )

  return {
    deleteSale,
    isDeletingSale,
    updateSale,
    isUpdatingSale,
    createSale,
    isCreatingSale,
    sales,
    isFetchingSales,
    refreshSales,
  }
}
