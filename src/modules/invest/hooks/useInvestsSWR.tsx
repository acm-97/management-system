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

export default function useInvestsSWR() {
  const query = useQueryParamsStore(state => state.query)
  const {
    data: invests,
    isLoading: isFetchingInvests,
    mutate: refreshInvests,
  } = useSWR(`/invests${query}`, client.get, swrConfig)

  const {trigger: createInvest, isMutating: isCreatingInvest} = useSWRMutation(
    '/invests',
    client.post,
    {
      onSuccess: async () => await refreshInvests(),
      onError: error => toast.error(error, errorProps),
    },
  )

  const {trigger: updateInvest, isMutating: isUpdatingInvest} = useSWRMutation(
    '/invests',
    client.put,
    {
      onSuccess: async () => await refreshInvests(),
      onError: error => toast.error(error, errorProps),
    },
  )

  const {trigger: deleteInvest, isMutating: isDeletingInvest} = useSWRMutation(
    '/invests',
    client.delete,
    {
      onSuccess: async () => await refreshInvests(),
      onError: error => toast.error(error, errorProps),
    },
  )

  return {
    deleteInvest,
    isDeletingInvest,
    updateInvest,
    isUpdatingInvest,
    createInvest,
    isCreatingInvest,
    invests,
    isFetchingInvests,
    refreshInvests,
  }
}
