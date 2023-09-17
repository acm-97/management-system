import {create} from 'zustand'

type Store = {
  selectedRows: number[]
  selectAllRows: (selectedRows: number[]) => void
  removeAllSelectedRows: () => void
  addSelectedRows: (id: number) => void
  removeSelectedRows: (id: number) => void
}

export const useRowsStore = create<Store>()(set => ({
  selectedRows: [],
  selectAllRows: (selectedRows: number[]) => set(() => ({selectedRows})),
  removeAllSelectedRows: () => set(() => ({selectedRows: []})),
  addSelectedRows: (id: number) => set(state => ({selectedRows: [...state.selectedRows, id]})),
  removeSelectedRows: (id: number) =>
    set(state => ({selectedRows: state.selectedRows.filter(item => item !== id)})),
}))
