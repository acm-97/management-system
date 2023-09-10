import {create} from 'zustand'

type Store = {
  isOpen: boolean
  product: Record<string, any> | null
  setOpen: (open: boolean) => void
  setProduct: (product: Record<string, any> | null) => void
  openDialog: () => void
  closeDialog: () => void
}

export const useColumnsStore = create<Store>()(set => ({
  isOpen: false,
  product: null,
  setOpen: (isOpen: boolean) => set(() => ({isOpen})),
  setProduct: (product: Record<string, any> | null) => set(() => ({product})),
  openDialog: () => set(() => ({isOpen: true})),
  closeDialog: () => set(() => ({isOpen: false})),
}))
