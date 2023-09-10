import {create} from 'zustand'

type Store = {
  selectedRows: string[]
  selectAllRows: (selectedRows: string[]) => void
  removeAllSelectedRows: () => void
  addSelectedRows: (id: string) => void
  removeSelectedRows: (id: string) => void
}

export const useRowsStore = create<Store>()(set => ({
  selectedRows: [],
  selectAllRows: (selectedRows: string[]) => set(() => ({selectedRows})),
  removeAllSelectedRows: () => set(() => ({selectedRows: []})),
  addSelectedRows: (id: string) => set(state => ({selectedRows: [...state.selectedRows, id]})),
  removeSelectedRows: (id: string) =>
    set(state => ({selectedRows: state.selectedRows.filter(item => item !== id)})),
}))
