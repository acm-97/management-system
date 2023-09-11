import {create} from 'zustand'

type Store = {
  isOpen: boolean
  column: Record<string, any> | null
  setOpen: (open: boolean) => void
  setColumn: (column: Record<string, any> | null) => void
  openDialog: () => void
  closeDialog: () => void
}

export const useColumnsStore = create<Store>()(set => ({
  isOpen: false,
  column: null,
  setOpen: (isOpen: boolean) => set(() => ({isOpen})),
  setColumn: (column: Record<string, any> | null) => set(() => ({column})),
  openDialog: () => set(() => ({isOpen: true})),
  closeDialog: () => set(() => ({isOpen: false})),
}))
