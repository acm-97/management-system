import React, {memo} from 'react'
import {useSalesSWR} from '../hooks'
import {useProductsSWR} from '@/hooks'
import {SaleInvTable} from '@/components'
import {AddProductDialog} from '.'

function SalesTable() {
  const {sales} = useSalesSWR()
  const {products} = useProductsSWR()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-center text-3xl font-bold">Control de Ventas</h2>
        <AddProductDialog />
      </div>
      <SaleInvTable rows={sales?.data} columns={products?.data} />
    </div>
  )
}

export default memo(SalesTable)
