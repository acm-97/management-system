import {client} from '@/utils'
import useSWR from 'swr'

export default function useSalesSWR() {
  const {
    data: sales,
    isLoading: isFetchingSales,
    mutate: refreshSales,
  } = useSWR('/sales?populate[info][populate]=*', client.get)
  return {sales, isFetchingSales, refreshSales}
}
