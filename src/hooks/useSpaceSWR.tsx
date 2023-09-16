import {swrConfig} from '@/constants'
import {client, errorProps} from '@/utils'
import {toast} from 'react-toastify'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

export default function useSpacesSWR() {
  const {
    data: spaces,
    isLoading: isFetchingSpaces,
    mutate: refreshSpaces,
  } = useSWR('spaces', client.get, swrConfig)

  const {trigger: createSpace, isMutating: isCreatingSpace} = useSWRMutation(
    '/spaces',
    client.post,
    {
      onSuccess: ({data: {data}}) => {
        refreshSpaces()
        window.location.href = `/${data.title.replace(' ', '-').toLowerCase()}`
      },
      onError: error => toast.error(error, errorProps),
    },
  )

  const {trigger: updateSpace, isMutating: isUpdatingSpace} = useSWRMutation(
    '/spaces',
    client.put,
    {
      onSuccess: async () => await refreshSpaces(),
      onError: error => toast.error(error, errorProps),
    },
  )

  const {trigger: deleteSpace, isMutating: isDeletingSpace} = useSWRMutation(
    '/spaces',
    client.delete,
    {
      onSuccess: async () => {
        await refreshSpaces()
      },
      onError: error => toast.error(error, errorProps),
    },
  )

  return {
    deleteSpace,
    isDeletingSpace,
    updateSpace,
    isUpdatingSpace,
    createSpace,
    isCreatingSpace,
    spaces,
    isFetchingSpaces,
    refreshSpaces,
  }
}
