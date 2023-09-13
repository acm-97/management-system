import {useEffect} from 'react'
import {swrConfig} from '@/constants'
import {client, errorProps} from '@/utils'
import useSWR from 'swr'
import {toast} from 'react-toastify'
import useSWRMutation from 'swr/mutation'
import useRowsSWR from './useRowsSWR'

export default function useColumnsSWR(space: string) {
  const {refreshRows} = useRowsSWR(space)

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
        refreshRows()
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
        refreshRows()
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
        refreshRows()
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
