import {swrConfig} from '@/constants'
import {client, errorProps} from '@/utils'
import {toast} from 'react-toastify'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import {create} from 'zustand'

type Store = {
  query: string
  updateQuery: (query: string) => void
}

export const useQueryParamsStore = create<Store>()(set => ({
  query: '?populate[info][populate]=*&sort=createdAt:desc&pagination[pageSize]=10',
  updateQuery: (query: string) => set(state => ({query: `${state.query}${query}`})),
}))

export default function useRowsSWR(space: string) {
  const query = useQueryParamsStore(state => state.query)
  const {
    data: rows,
    isLoading: isFetchingRows,
    mutate: refreshRows,
  } = useSWR(`/${space}${query}`, client.get, swrConfig)

  const {trigger: createRow, isMutating: isCreatingRow} = useSWRMutation('/rows', client.post, {
    onSuccess: async () => await refreshRows(),
    onError: error => toast.error(error, errorProps),
  })

  const {trigger: updateRow, isMutating: isUpdatingRow} = useSWRMutation('/rows', client.put, {
    onSuccess: async () => await refreshRows(),
    onError: error => toast.error(error, errorProps),
  })

  const {trigger: deleteRow, isMutating: isDeletingRow} = useSWRMutation('/rows', client.delete, {
    onSuccess: async () => await refreshRows(),
    onError: error => toast.error(error, errorProps),
  })

  return {
    deleteRow,
    isDeletingRow,
    updateRow,
    isUpdatingRow,
    createRow,
    isCreatingRow,
    rows,
    isFetchingRows,
    refreshRows,
  }
}
