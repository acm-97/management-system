import {useEffect} from 'react'
import {SPACES, swrConfig} from '@/constants'
import {client, errorProps} from '@/utils'
import useSWR from 'swr'
import {toast} from 'react-toastify'
import useSWRMutation from 'swr/mutation'
import {useSalesSWR} from '@/modules/sales/hooks'
import {useInvestsSWR} from '@/modules/invest/hooks'

export default function useColumnsSWR(space: string) {
  const {refreshSales} = useSalesSWR()
  const {refreshInvests} = useInvestsSWR()

  const {
    data: subHeaders,
    isLoading: isFetchingSubHeaders,
    error: subHeadersError,
  } = useSWR('/product-sub-headers', client.get, swrConfig)

  const {
    data: columns,
    isLoading: isFetchingColumns,
    error,
    mutate: refreshColumns,
  } = useSWR(
    space ? `/products?filters[space][$eq]=${space}&populate[subHeaders][populate]=*` : null,
    client.get,
    swrConfig,
  )

  useEffect(() => {
    if (error) {
      toast.error(error, errorProps)
    }
    if (subHeadersError) {
      toast.error(subHeadersError, errorProps)
    }
  }, [error, subHeadersError])

  const {trigger: createColumn, isMutating: isCreatingColumn} = useSWRMutation(
    `/products`,
    client.post,
    {
      onSuccess: () => {
        refreshColumns()
        space === SPACES.SALES && refreshSales()
        space === SPACES.INVEST && refreshInvests()
      },
      onError: error => toast.error(error, errorProps),
    },
  )

  const {trigger: updateColumn, isMutating: isUpdatingColumn} = useSWRMutation(
    `/products`,
    client.put,
    {
      onSuccess: () => {
        refreshColumns()
        space === SPACES.SALES && refreshSales()
        space === SPACES.INVEST && refreshInvests()
      },
      onError: error => toast.error(error, errorProps),
    },
  )

  const {trigger: deleteColumn, isMutating: isDeletingColumn} = useSWRMutation(
    `/products`,
    client.delete,
    {
      onSuccess: () => {
        refreshColumns()
        space === SPACES.SALES && refreshSales()
        space === SPACES.INVEST && refreshInvests()
      },
      onError: error => toast.error(error, errorProps),
    },
  )

  return {
    columns,
    isFetchingColumns,
    subHeaders,
    isFetchingSubHeaders,
    createColumn,
    isCreatingColumn,
    updateColumn,
    isUpdatingColumn,
    deleteColumn,
    isDeletingColumn,
  }
}
